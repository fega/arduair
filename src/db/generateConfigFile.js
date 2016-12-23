var Device = require('./device');
/**
 * Middleware that generate a configFile and return it to the client
 */
module.exports = function(req, res, next) {
  var query = {
    name: req.body["device"],
    password: req.body["pass"]
  };
  Device.findOne(query,{configFile:1,name:1,password:1}, (err, device) => {
    if (err) {
      console.log('Handled error: ' + err);
      req.result = {
        status: "error",
        message: "Search error, please try again"
      };
      return next();
    }
    if (!device) {
      console.log('error');
      req.result = {
        status: "error",
        message: "this Device/Password combination doesn't exist"
      };
      return next();
    }
    if (device) {
      console.log('Devices matched:'.rainbow+device);
      //generate device config file
      var configFile=
`[device=${device.name}]
[password=${device.password}]

${setConfig(device,"network")}
${setConfig(device,"networkpass")}

${setConfig(device,"server")}
${setConfig(device,"wifi")}

${setConfig(device,"pm10_x2")}
${setConfig(device,"pm10_x1")}
${setConfig(device,"pm10_b")}

${setConfig(device,"pm25_x2")}
${setConfig(device,"pm25_x1")}
${setConfig(device,"pm25_b")}

${setConfig(device,"co_x2")}
${setConfig(device,"co_x1")}
${setConfig(device,"co_b")}

${setConfig(device,"co_x2")}
${setConfig(device,"co_x1")}
${setConfig(device,"co_b")}

${setConfig(device,"o3_x2")}
${setConfig(device,"o3_x1")}
${setConfig(device,"o3_b")}

${setConfig(device,"so2_x2")}
${setConfig(device,"so2_x1")}
${setConfig(device,"so2_b")}

${setConfig(device,"no2_x2")}
${setConfig(device,"no2_x1")}
${setConfig(device,"no2_b")}

${setConfig(device,"h_x1")}
${setConfig(device,"h_b")}

${setConfig(device,"p_x1")}
${setConfig(device,"p_b")}

${setConfig(device,"t_x1")}
${setConfig(device,"t_b")}

${setConfig(device,"l_x1")}
${setConfig(device,"l_b")}
`;
      res.set({"Content-Disposition":"attachment; filename=CONFIG.txt"});
      res.send(configFile);
    }
  });
};

function setConfig(object,variable,name){
  if (name===undefined){
    name=variable;
  }
  return object.configFile[variable]!==undefined?
  `[${name}=${object.configFile[variable]}]`:
  "";
}
