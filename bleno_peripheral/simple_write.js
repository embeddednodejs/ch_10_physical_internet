var noble = require('noble');

var serviceUuid = '12341234123412341234123412341234';
var writeCharacteristicUuid = '34563456345634563456345634563456';

noble.on('stateChange', function(state) {
  console.log('start');
  if (state === 'poweredOn') {
    console.log('scanning...');
    noble.startScanning([serviceUuid], false);
  }
  else {
    noble.stopScanning();
  }
})

noble.on('scanStart', function() {
      console.log("Starting to scan peripheral");
});

noble.on('scanStop', function() {
      console.log("Stopping peripheral scan");
});

var data = new Buffer(2);                                              
data.writeUInt16BE(53, 0); 

noble.on('discover', function(peripheral) {
  noble.stopScanning();

  console.log('found peripheral:', peripheral.advertisement);

  peripheral.connect(function(err) {

    peripheral.discoverServices([serviceUuid], function(err, services) {
      services.forEach(function(service) {
        //
        // This must be the service we were looking for.
        //
        console.log('found service:', service.uuid);

        //
        // So, discover its characteristics.
        //
        service.discoverCharacteristics([], function(err, characteristics) {

          characteristics.forEach(function(characteristic) {
            //
            // Loop through each characteristic and match them to the
            // UUIDs that we know about.
            //
            console.log('found characteristic:', characteristic.uuid);

            if (writeCharacteristicUuid == characteristic.uuid) {
               console.log('going to switch LED on');

            writeCharacteristic = characteristic;

            writeCharacteristic.write(data , false, function(err) {
              if (err) {
                console.log('write error');
              }
            });
            }
          })

        })
      })
    })
  })
})
