var Device = require('./device');
module.exports = function(req,res,next){
	Device.findOne({name : req.params.device},function(err,data){
		if(err){
			console.log ('getDeviceData Handled Error: '+ err);
			req.result ={status:'error', message:'Search error, please try again'};
			return next();			
		}
		if (!data){
			console.log('getDeviceData no device found');
			req.result={status:'error', message:'Device not found'};
			return next();
		}
		if (data){
			console.log('Device Data retrieved'+ data);
			req.result={status:'done', message:'Device data retrieved',data:'data'};
			return next();
		}
	});
};