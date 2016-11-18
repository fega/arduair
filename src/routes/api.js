var express = require('express');
var router = express.Router();
var store = require('../db/storeData');
var getConfig = require('../db/getDeviceConfig');
var storeConfig = require('../db/storeConfig');
var dateCheck = require('../lib/datecheck');
/**
 * GET /:device/:password/config
 * get the config for the provided device, usefull to store the configuration
 * in the device
 */
router.get('/:device/:password/config',getConfig,(req,res)=>{
	res.send(req.result);
});
/**
 * POST /:device/:password/config
 * POST the config for the provided device, usefull to store the configuration in the db
 */
router.post('/:device/:password/config',storeConfig,(req,res)=>{
	res.send(req.result);
});
/**
 * GET /:device/:password/servertime
 * Store data with the servertime, usefull when you don't have clock
 */
router.get('/:device/:password/servertime' ,isServerTime,store,(req,res)=>{
	res.send(req.result);
});
/**
 * GET /:device/:password/:day/:month/:year/:hour/:minute
 * Store data with the provided date.
 */
router.get('/:device/:password/:day/:month/:year/:hour/:minute',dateCheck,store,(req,res)=>{
	res.send(req.result);
});

module.exports = router;

function isServerTime(req,res,next){
	req.isServerTime=true;
	return next();
}
