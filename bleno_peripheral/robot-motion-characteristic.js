var util = require('util');

// var bleno = require('bleno');
var bleno = function() {}

var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

function RobotMotionCharacteristic(robot) {
  RobotMotionCharacteristic.super_.call(this, {
    uuid: '01010101010101010101010101524742',
    properties: ['write', 'writeWithoutResponse'],
    descriptors: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'set fwd value'
      })
    ]
  });

  this.robot = robot;
}

util.inherits(RobotMotionCharacteristic, BlenoCharacteristic);

RobotMotionCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  } else if (data.length !== 3) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  } else {
    var r = data.readUInt8(0);
    var g = data.readUInt8(1);
    var b = data.readUInt8(2);

    this.robot.fwd(speed, function() {
      callback(this.RESULT_SUCCESS);
    }.bind(this));
  }
};

module.exports = RobotMotionCharacteristic;
