var bCrypt = require('bcrypt-nodejs');
var device = requite('db/device');

module.exports = function(req,res,next){
	device.findOne({macAddress:req.param.macAddress},function(err,dev){
		if (err) {
			console.log('Error in SignUp: ' + err);
			return done(err);
		}
		if (dev) {
			console.log('User already exists with username: ' + username);
			return done(null, false, req.flash('message', 'User Already Exists'));
		} else {
			var newDevice =new Device();

			newDevice.name = req.param.name;
		    newDevice.macAddress = req.param.macAddress;
		    newDevice.password = req.param.password;
		    newDevice.description = req.param.description;
		});
}