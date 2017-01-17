var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Device database model
 */
module.exports = mongoose.model('device', {
  name: String, //device name
  password: String, //device password
  description: String, //device description
  configFile: {},
  //parameters:[String], //device parameters
  owner: String, //device owner
  email: String, //owner email

  lastRegister: {
    type: Date,
    default: Date.now
  }, //last time of a measure was sended
  date: [Date], //array with measure dates
  humidity: [Number], //humidity in %
  temperature: [Number], //temperature in °C
  pressure: [Number], //presure in ¿¿mb??
  location: [String], //location in geographic coordinates
  pst: [Number], //pst in ug/m3
  pm10: [Number], //P.M. 10 in ug/m3
  pm25: [Number], //P.M. 2.5 in ug/m3
  so2: [Number], //SO2
  no2: [Number], //NO2
  o3: [Number], //O3
  co: [Number], //CO
});
