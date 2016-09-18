// Based on examples from Kelsey Breseman:
//   https://tessel.hackster.io/ifoundthemeaningoflife/ble-proximity-switch-f5df21

var noble = require('noble');
var Ble = require('./ble_helpers.js');

var acceptedDevices = [
  "94:a1:a2:b3:ad:e3"
];

var ble = new Ble(acceptedDevices);
ble.scan();

