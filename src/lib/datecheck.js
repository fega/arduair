module.exports=datecheck;
/**
 * Middleware that Check if the params day, month,
 * year, hour and minute are okay in range. if all
 * it's okay it call the next() middleware.
 * else it sends and error message.
 * @param  {Object} req    the request
 * @param  {Object} res    the response
 * @param  {Function} next the callback function
 * @return {Function}      return an error or the next() callback
 */
function datecheck(req,res,next){
	req.message="";
	req.message+=checkRange(req.params.day,  31,   0,'day');
	req.message+=checkRange(req.params.month,12,   0,'month');
	req.message+=checkRange(req.params.year, 10000,2000,'year');
	req.message+=checkRange(req.params.hour, 24,   0,'hour');
	req.message+=checkRange(req.params.minute,60,  0,'minute');

	//console.log(req.message);
	if (isEmpty(req.message)){
		return next();
	}else{
		res.send(req.message);
	}
}
/**
 * Check if str is empty
 * @param  {String}  str String to check
 * @return {Boolean}
 */
function isEmpty(str) {
	return (!str || 0 === str.length);
}
/**
 * Check if the value provide is beetween min and max, if not.
 * returns and String with the error
 * @param  {Int} val  Value to be evaluated
 * @param  {Int} min  min value range
 * @param  {Int} max  Max value range
 * @param  {String} name String to build the error message
 * @return {String}
 */
function checkRange(val,min,max,name){
	if(!val || val>max || val<min || isNaN(val)){
		return `Problems with ${name}, <br>`;
	}else {
		return "";
	}
}
