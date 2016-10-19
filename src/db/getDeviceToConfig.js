var Device = require('./device');
module.exports = function (req,res,next){
	Device.findOne(req.body,(err,device)=>{
		if(err){
				console.log('Handled error: ' + err);
				req.result ={status:"error",message:"Search error, please try again"};
				return next();
			}
			if (!device){
				console.log('No Devices matched in dataBase');
				req.result ={status:"error",message:"this Device/Password combination doesn't exist"};
				return next();
			}
			if (device){
				console.log('Devices matched');
				req.result ={status:"done",message:"Device Found",device};
				return next();
			}
	});
};
