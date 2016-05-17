var Device = require('./device');
module.exports = function (req,res,next){
	console.log(req.body)
	
	Device.findOne(req.body,function(err,device){
		if(err){
				console.log('Handled error: ' + err);
				req.result ={status:"error",message:"Search error, please try again"};
				return next();
			}
			if (!device){
				console.log('No Devices matched in dataBase');
				req.result ={status:"error",message:"this Device/Password Configuration Doesn't exist"};
				return next();
			}
			if (device){
				console.log('Devices matched');
				req.result ={status:"done",message:"Devices Loaded",device:device};
				return next();
			}
	})
};






search=function(){
			Device.findOne({"name":req.body.name}),function(err,device){
			console.log("AUUUUUUUUU")
			if(err){
				console.log('Handled error: ' + err);
				req.result ={status:"error",message:"Search error, please try again"};
				return next();
			}
			if (!device){
				console.log('No Devices matched in dataBase');
				req.result ={status:"error",message:"this Device/Password Configuration Doesn't exist"};
				return next();
			}
			if (device){
				console.log('Devices matched');
				req.result ={status:"done",message:"Devices Loaded",device:devices};
				return next();
			}
		}
	}