var noble = require('noble');
var _ = require('underscore');

// show device information
function showDevice(p) {
     console.log('device discovered: ', p);
     console.log('  id:         ', p.id);
     console.log('  address:    ', p.address);
     console.log('  localName:  ', localName);
}

var authorized, powered;

var Ble = function(acceptedDevices) {
  this.acceptedDevices = acceptedDevices;

  this.startScanning = function() {
    noble.on('stateChange', function(state) {
      if (state === 'poweredOn') {
        noble.startScanning([], true);
        powered = true;
      }
      else {
        console.log('stop scanning');
        noble.stopScanning();
      }
    });
  },

  this.stopScanning = function() {
    noble.stopScanning();
  }
 
  // Scan for devices regularly
  this.poll = function () {
    setTimeout(this.scan, 8000);
  }

  this.scan = function() {
    console.log('Scanning...');
    console.log(powered);

    if (powered) {
        noble.startScanning([], true);
    } else {
        this.startScanning();
    }
    noneFound = setTimeout(function () {
      this.stopScanning();
      console.log('No authorized BLE devices in range.');

      if(authorized) {
        deauthorize();
      }
      // Check for changes
      this.poll();
    }.bind(this), 4000);
  }

           
  this._processDiscovery = function(p) {
     // console.log('device discovered: ', p.advertisement);
     
     var localName = p.advertisement.localName; 
     var deviceID = p.address;
  
     if(this.acceptedDevices.indexOf(deviceID) > -1) {
       console.log('Authorized device in range.', deviceID);
       this.stopScanning();
       clearTimeout(noneFound);
       if(!authorized) {
         authorize();
       }

       // Check for changes
       this.poll();
     } else {
       console.log('Unauthorized device discovered.', deviceID);
     }
  
     if (localName == "Duo-K62G") {
       // showDevice();
       console.log("detected");
     }
  }
  _.bindAll(this, 'startScanning', 'poll', 'scan', '_processDiscovery');

  noble.on('discover', this._processDiscovery);
  
}

function authorize () {
    authorized = true;
  //  relay.turnOn(1);
    console.log('authorized:', authorized);
}

function deauthorize () {
  authorized = false;
 // relay.turnOff(1);
  console.log('authorized:', authorized);
}

module.exports = Ble;
