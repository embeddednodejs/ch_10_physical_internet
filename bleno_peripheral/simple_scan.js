var noble=require('noble');

noble.on('stateChange', function(state) {

    // possible state values: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
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

var allDevices=[];
noble.on('discover', function(peripheral) {
  allDevices.push(peripheral);
//    console.log('Found device with local name: ' + peripheral.advertisement.localName);
//    console.log(peripheral.advertisement);
//    console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
//    console.log();
//    console.log('advertising the following service uuid\'s: ' + peripheral);
});

setTimeout(function() {
  allDevices.forEach(function(d) {
    console.log(d.uuid);
    console.log(d.advertisement);
  });
  process.exit(1);
}, 8000);
