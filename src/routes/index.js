const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const getBody = bodyParser.urlencoded({extended: true});
const addDevice = require('../db/addDevice');
const getDevice = require('../db/getDeviceAll');
const getData = require ('../db/getDeviceData');
const getDeviceToConfig = require('../db/getDeviceToConfig');
/*//////////////////
/* API 						*/
//////////////////*/
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
/*POST: device and password combination exist?, to config the device?*/
router.post('/config',getBody,getDeviceToConfig,(req,res)=>{
	res.send(req.result);
});
/*//////////////////
/* GET home page. */
//////////////////*/
router.get(['/documentation','/data','/data/*','/add','/configure','/'], (req, res)=> {
  res.render('index', { title: 'Arduair' });
});
/*////////////////////////////
/* Download Config template */
////////////////////////////*/
router.get('/download/config-template',(req,res) =>{
	res.download(path.join(__dirname,'../', 'public', 'files','config.txt'));
});

module.exports = router;
