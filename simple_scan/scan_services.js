var noble=require('noble');

noble.on('stateChange', function(state) {

    console.log(state);
    if (state === 'poweredOn') {
      noble.startScanning([], false);
      powered = true;
    }
    else {
      console.log('stop scanning');
      noble.stopScanning();
    }
});

var targetServiceUUID = "713d0000503e4c75ba943148f18d941e";

// explore services from peripheral
noble.on('discover', function(peripheral) {
   console.log("found device: " + peripheral.advertisement.localName);
   console.log("   services: " + peripheral.advertisement.serviceUuids);

   peripheral.connect(function(err) {
     peripheral.discoverServices([targetServiceUUID], function(err, services) {
       console.log("    *** service found ***");
       services.forEach(function(service) {
          console.log(service);

          service.discoverCharacteristics([], function(err, characteristics) {

            // list characteristics
            characteristics.forEach(function(characteristic) {
              console.log('found characteristic:', characteristic.uuid);
            });
          });
       });
    });
  });
});
