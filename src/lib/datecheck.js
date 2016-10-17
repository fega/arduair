

module.exports=datecheck;
/**
 * checkquea que los parametros ingresados al request sean una decha valida
 * @param  {Object} req    the request
 * @param  {Object} res    the response
 * @param  {Function} next the callback function
 * @return {Function}      return an error or the next() callback
 */
function datecheck(req,res,next){
	console.log('DAY: '+ req.params.day);
	console.log('MONTH: '+ req.params.month);
	console.log('YEAR: '+ req.params.year);

	if(!req.params.day || req.params.day>31 || req.params.day<0 || isNaN(req.params.day)){
		req.message+='Problemas el parametro dia, <br>';
		console.log('req.message');
	}
	if(!req.params.month || req.params.month>12 || req.params.month<0 || isNaN(req.params.month)){
		req.message+='Problemas el parametro mes, <br>';
	}
	if(!req.params.year || req.params.year<=2000 || isNaN(req.params.year)){
		//esto esta fallando...
		req.messag+='Problemas el parametro año, <br>';
	}
	if(!req.params.hour || req.params.hour>24 || req.params.hour<0 || isNaN(req.params.hour)){
		req.message+='Problemas el parametro hora, <br>';
	}
	if(!req.params.minute || req.params.minute>60 || req.params.minute<0 || isNaN(req.params.minute)){
		req.message+='Problemas el parametro minuto, <br>';
	}
	console.log(req.message);
	if (isEmpty(req.message)){
		return next();
	}else{
		res.send(req.message);
	}
};
function isEmpty(str) {
    return (!str || 0 === str.length);
}
