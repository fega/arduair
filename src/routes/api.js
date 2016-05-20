var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var getBody = bodyParser.urlencoded({extended: true});
var store = require('../db/storeData');
var dateCheck = require('../lib/datecheck');
/*GET test:
*CC3000 : PASS
*/
router.get('/:device/:password/servertime' ,isServerTime,store,function(req,res,next){
	res.send(req.result);
});
router.get('/:device/:password/:day/:month/:year/:hour/:minute',dateCheck,store,function(req,res,next){
	res.send(req.result);
});
module.exports = router;

function isServerTime(req,res,next){
	req.isServerTime=true;
	return next();
}

