module.exports=datecheck;
/**
 * Check if the params day,
 * @param  {Object} req    the request
 * @param  {Object} res    the response
 * @param  {Function} next the callback function
 * @return {Function}      return an error or the next() callback
 */
function datecheck(req,res,next){
	var day= req.params.day;//console.log('DAY: '+ day);
	var month= req.params.month;//console.log('MONTH: '+ month);
	var year= req.params.year;//console.log('YEAR: '+ year);
	var hour= req.params.hour;
	var minute= req.params.minute;

	checkRange(day,  31,   0,'day');
	checkRange(month,12,   0,'month');
	checkRange(year, 10000,2000,'year');
	checkRange(hour, 24,   0,'hour');
	checkRange(minute,60,  0,'minute');

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
