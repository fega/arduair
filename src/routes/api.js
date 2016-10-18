var express = require('express');
var router = express.Router();
var store = require('../db/storeData');
var dateCheck = require('../lib/datecheck');
/*GET test:
*CC3000 : PASS
*/
router.get('/:device/:password/timezone/' ,isServerTime,store,(req,res)=>{
	res.send(req.result);
});
router.get('/:device/:password/servertime' ,isServerTime,store,(req,res)=>{
	res.send(req.result);
});
router.get('/:device/:password/:day/:month/:year/:hour/:minute',dateCheck,store,(req,res)=>{
	res.send(req.result);
});
module.exports = router;

function isServerTime(req,res,next){
	req.isServerTime=true;
	return next();
}
