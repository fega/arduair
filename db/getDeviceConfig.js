var Device = require('./device');
/**
 * Middleware that get configuration from server
 */
module.exports = function(req, res, next) {
  var query = {
    name: req.params.device,
    password: req.params.password
  };
  var projection = {
    configFile: 1,
  };
  Device.findOne(query, projection, (err, device) => {
    if (err) {
      console.log('getDeviceConfig Handled Error: ' + err);
      req.result = {
        status: 'error',
        message: 'Search error, please try again'
      };
      return next();
    }
    if (!device) {
      console.log('getDeviceConfig no device found');
      req.result = {
        status: 'error',
        message: 'Device not found'
      };
      return next();
    }
    if (device) {
      console.log('Device config retrieved and generated'.green + JSON.stringify(device.configFile));
      var result = ``;
      for (var key in device.configFile) {
        if (device.configFile.hasOwnProperty(key)) {
          result += `[${key}=item]\n`;
        }
      }
      req.result = result;
      return next();
    }
  });
};
