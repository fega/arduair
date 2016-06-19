var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var getBody = bodyParser.urlencoded({extended: true});
/*GET test:
*CC3000 : PASS
*/
router.get('/',function(req,res,next){
	res.send('GET method test device pass');
});
/*POST test:
*CC3000 : FAIL
*/
router.post('/',getBody,function(req,res,next){

	res.send('POST method test device pass' + req.body);
});
/*PUT test:
*CC3000 : FAIL
*/
router.put('/',function(req,res,next){
	res.send('PUT method test device pass');
});
/*DELETE test:
*CC3000 : FAIL
*/
router.delete('/',function(req,res,next){
	res.send('DELETE method test device pass');
});

module.exports = router;