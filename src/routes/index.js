var express = require('express');
var router = express.Router();
var fs =require ('fs');
var marked = require('marked');

var getWiki=function(req,res,next){
	console.log(req.params.article);
	fs.readFile("./arduair.wiki/"+req.params.article+".md",function(err,data){
		if(err){
			console.log(err);
			res.status(err.status || 404);
			res.send('Archivo de documentacion no encontrado, <a href="/documentation">volver<a>');
		}
		else{
			console.log("data Async Loaded");
			console.log(data.toString());
			req.wiki = marked(data.toString());
			return next();
		}
	});
}


router.get('/documentation/:article',getWiki,function(req,res,next){
	res.send(req.wiki);
});

/* GET home page. */
router.get('/*', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

module.exports = router;
