var express = require('express');
var router = express.Router();
var fs =require ('fs');
var marked = require('marked');
var bodyParser = require('body-parser');
var getBody = bodyParser.urlencoded({extended: true});
var addDevice = require('../db/addDevice');
var getDevice = require('../db/getDeviceAll');
var getDeviceToConfig = require('../db/getDeviceToConfig');

var getWiki=function(req,res,next){
	console.log(req.params.article);
	fs.readFile("./arduair.wiki/"+req.params.article+".md",function(err,data){
		if(err){
			console.log(err);
			res.status(err.status || 404);
			res.send('Archivo de documentacion no encontrado, <a href="/documentation">volver<a>');
		}
		else{
			console.log("data Async Loaded");
			console.log(data.toString());
			req.wiki = marked(data.toString());
			return next();
		}
	});
};
/* GET documentation article. */
router.get('/documentation/:article',getWiki,function(req,res,next){
	res.send(req.wiki);
});
/*POST addDevice*/
router.post('/device',getBody,addDevice,function(req,res){
	res.send(req.result);
});
/*GET all devices*/
router.get('/device',getDevice, function(req, res, next) {
 	res.send(req.result);
});
/*GET device data*/
router.get('/device/:device/:password',function(req,res,next){
	res.send('device Data');
});
/*GET device status*/
router.get('/device/:device/:password/status',function(req,res,next){
	res.send('device status');
});
/* GET test page*/
router.get('/test',function(req,res,next){
	res.send('Server and Device OK :)');
});
/*POST: device and password combination exist?, to config the device?*/
router.post('/config',getBody,getDeviceToConfig,function(req,res){
	console.log(req.body);
	res.send(req.result);
})



/*//////////////////
/* GET home page. */
//////////////////*/
router.get('/documentation', function(req, res, next) {
  	res.render('index', { title: 'Arduair' });
});
router.get('/data', function(req, res, next) {
  	res.render('index', { title: 'Arduair' });
});
router.get('/add', function(req, res, next) {
  	res.render('index', { title: 'Arduair' });
});
router.get('/configure', function(req, res, next) {
  	res.render('index', { title: 'Arduair' });
});
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Arduair' });
});


module.exports = router;
