 var Device = require('./device');

module.exports = function (req,res,next){
	Device.find({},(err,devices)=>{

		if (err){
			console.log('Handled error: ' + err);
			req.result ={status:"error",message:"Search error, please try again"};
			return next();
		}
		if (!devices){
			console.log('No Devices in dataBase');
			req.result ={status:"error",message:"No devices in dataBase"};
			return next();
		}
		if (devices){
			console.log('Devices Sended'.green );
			if(devices.length > 0){
				req.result ={status:"done",message:"Devices Loaded",devices};
				return next();
			}else{
				req.result ={status:"error",message:"No Devices in dataBase",devices};
				return next();
			}

		}
	});
};
