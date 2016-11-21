module.exports=datecheck;
/**
 * Check if the params day,
 * @param  {Object} req    the request
 * @param  {Object} res    the response
 * @param  {Function} next the callback function
 * @return {Function}      return an error or the next() callback
 */
function datecheck(req,res,next){
	checkRange(req.params.day,  31,   0,'day');
	checkRange(req.params.month,12,   0,'month');
	checkRange(req.params.year, 10000,2000,'year');
	checkRange(req.params.hour, 24,   0,'hour');
	checkRange(req.params.minute,60,  0,'minute');

	//console.log(req.message);
	if (isEmpty(req.message)){
		return next();
	}else{
		res.send(req.message);
	}
	function checkRange(val,min,max,name){
		if(!val || val>max || val<min || isNaN(val)){
			req.message+=`Problems with ${name}, <br>`;
			console.log('req.message');
		}
	}
	function isEmpty(str) {
		return (!str || 0 === str.length);
	}
}
