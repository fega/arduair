
//var bCrypt = require('bcrypt-nodejs');
var Device = require('./device');
/**
 * Express middleware to add a device to the database
 */
module.exports = function(req, res, next) {
    var add = function() {
        Device.findOne({
            name: req.body.addname
        }, (err, dev) => {
            if (err) {
                console.log('Error in register: ' + err);
                req.result = {status: "error ",message: "something happened, please try again" };
                return next();
            }
            if (dev) {
                console.log('device already exist: ' + dev);
                req.result = {status: "error ",message: "Device Name already exists"};
                return next();
            } else {
                var newDevice = new Device();
                newDevice.name = req.body.addname;
                newDevice.owner = req.body.addowner;
                newDevice.email = req.body.addemail;
                newDevice.password = req.body.addpassword;
                newDevice.description = req.body.adddescription;
                newDevice.configFile ={
                  password: req.body.addpassword,
                  name: req.body.addname
                };
                newDevice.save((err) => {
                    if (err) {
                        console.log('error saving the device');
                        req.result = {status: "error ",message: "Saving error, please try again"};
                        return next();
                    } else {
                        console.log('Device ' + req.body.addname + ' Saved');
                        req.result = {status: "done ",message: "Device saved"};
                        return next();
                    }
                });
            }
        });
    };
    process.nextTick(add);
};
