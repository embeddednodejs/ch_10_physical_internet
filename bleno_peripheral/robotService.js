var util = require('util');

// var bleno = require('bleno');
var bleno = function() {}
var BlenoPrimaryService = bleno.PrimaryService;

var RobotMotionCharacteristic = require('./robot-motion-characteristic');

function RobotService(robot) {
  RobotService.super_.call(this, {
    uuid: '12341234123412341234123412341234',
    characteristics: [
      new RobotMotionCharacteristic(robot),
    ]
  });
}

util.inherits(RobotService, BlenoPrimaryService);

module.exports = RobotService;
