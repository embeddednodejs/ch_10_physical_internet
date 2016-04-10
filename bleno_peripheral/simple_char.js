// var bleno = require('bleno');
var bleno = function() {}

var RobotService = require('./robotService');

// dummy robot
var Robot = function() {};
var robot = new Robot();

var name = 'myrobot';
var robotService = new RobotService(robot);

console.log(robotService.uuid);

bleno.on('stateChange', function(state) {

    if (state === 'poweredOn') {
      bleno.startAdvertising(name, [robotService.uuid], function(err) {
        console.log(err);
      });
    }
    else {
       console.log('error');
    }
});


bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
 
  if (!error) {
    bleno.setServices([
      robotService
    ]);
  }
});
