var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var getBody = bodyParser.urlencoded({extended: true});
var addDevice = require('../db/addDevice');
var getDevice = require('../db/getDeviceAll');
var getData = require ('../db/getDeviceData');
var getDeviceToConfig = require('../db/getDeviceToConfig');

/*POST addDevice*/
router.post('/device',getBody,addDevice,(req,res)=>{
	res.send(req.result);
});
/*GET all devices*/
router.get('/device',getDevice, (req, res)=>{
	res.send(req.result);
});
/*GET device data*/
router.get('/device/:device',getBody,getData,(req,res)=>{
	res.send(req.result);
});
/*GET device status*/
router.get('/device/:device/:password/status',(req,res)=>{
	res.send('device status');
});
/* GET test page*/
//router.get('/test',function(req,res,next){
//	res.send('Server and Device OK :)');
//});
/*POST: device and password combination exist?, to config the device?*/
router.post('/config',getBody,getDeviceToConfig,(req,res)=>{
	console.log(req.body);
	res.send(req.result);
});
/*//////////////////
/* GET home page. */
//////////////////*/
router.get(['/documentation','/data
','data/*','/add','/configure','/'], (req, res)=> {
  res.render('index', { title: 'Arduair' });
});
module.exports = router;
