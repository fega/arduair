var Device = require('./device');
/**
 * Middleware that retrieves the data from One device
 */
module.exports = function(req,res,next){
	Device.findOne({name : req.params.device},(err,device)=>{
		if(err){
			console.log ('getDeviceData Handled Error: '+ err);
			req.result ={status:'error', message:'Search error, please try again'};
			return next();
		}
		if (!device){
			console.log('getDeviceData no device found');
			req.result={status:'error', message:'Device not found'};
			return next();
		}
		if (device){
			console.log('Device Data retrieved'.green);
			var data= {
				name: device.name,
				date : device.date ,
				humidity : device.humidity ,
				temperature : device.temperature ,
				pressure : device.pressure ,
				location : device.Location ,
				pst : device.pst ,
				pm10 : device.pm10 ,
				pm25 : device.pm25 ,
				so2 : device.so2 ,
				no2 : device.no2 ,
				o3 : device.o3 ,
				co : device.co ,
				ch4 : device.ch4 ,
				nh3 : device.nh3
			};
			req.result={status:'done', message:'Device data retrieved', data};
			return next();
		}
	});
};
