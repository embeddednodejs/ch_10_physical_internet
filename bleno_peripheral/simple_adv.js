var bleno = require('bleno');

var name = 'name';
var serviceUuid = '18292191292929292929292';

bleno.on('stateChange', function(state) {

    if (state === 'poweredOn') {
      bleno.startAdvertising('myrobot', ['12341234123412341234123412341234'], function(err) {
        console.log(err);
      });
    }
    else {
       console.log('error');
    }
});
