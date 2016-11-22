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
/**
 * POST /device
 * this add a device to the db.
 */
router.post('/device',getBody,addDevice,(req,res)=>{
	res.send(req.result);
});
/**
 * GET all devices
 * this get the device names availables in the db.
 */
router.get('/device',getDevice, (req, res)=>{
	res.send(req.result);
});
/**
 *GET device data
 *get data for all devices
 */
router.get('/device/:device',getBody,getData,(req,res)=>{
	res.send(req.result);
});
/*POST: device and password combination exist?, to config the device?*/
router.post('/config',getBody,getDeviceToConfig,(req,res)=>{
	res.send(req.result);
});
/*//////////////////
/* GET home page. */
//////////////////*/
router.get(['/data','/data/*','/add','/configure','/'], (req, res)=> {
  res.render('index', { title: 'Arduair' });
});
/*////////////////////////////
/* Download Config template */
////////////////////////////*/
router.get('/download/config-template',(req,res) =>{
	res.download(path.join(__dirname,'../', 'public', 'files','CONFIG.txt'));
});

module.exports = router;
