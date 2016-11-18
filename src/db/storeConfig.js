var Device = require('./device');
/**
 * middleware Store the given configuration
 */
module.exports = function(req, res, next) {
  var query = {
    name: req.params.device,
    password: req.params.password
  };

  var store = { //get the variables
    $set: {
      configFile:{}
    }
  };
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key) && req.body[key]!="") {
      store.$set.configFile[key] = req.body[key];
    }
  }
	Device.update(query, store, (err, data)=> {
			console.log(data);
			if (err) {
					console.log('Handled error: ' + err);
					req.result = {status: "error",message: "Search error, please try again"};
					res.send("fail");
			} else {
					if (data.n === 0) {
							console.log('Device not found');
							req.result = "device not Found";
					} else {
							console.log('Device found and updated');
							req.result = "OK";
							req.data = data;
					}
					return next();
			}
	});
};
