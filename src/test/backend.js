/* eslint-disable */
var chai = require('chai');
var expect = require('chai').expect;
var http = require('chai-http');
chai.use(http);
baseUrl =	'http://localhost:3000';


describe('Home page',function(done){
	it('"/" Should return a home page',function(done){
		chai.request(baseUrl)
  		.get('/')
			.end((err,res)=>{
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			})
	})
	it('"/data" Should return a home page',function(done){
		chai.request(baseUrl)
			.get('/data')
			.end((err,res)=>{
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			})
	})
	it('"/data/something" Should return a home page',function(done){
		chai.request(baseUrl)
			.get('/data/something')
			.end((err,res)=>{
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			})
	})
	it('"/configure" Should return a home page',function(done){
		chai.request(baseUrl)
			.get('/configure')
			.end((err,res)=>{
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			})
	})
	it('"/documentation" ShouldN\'T return a home page',function(done){
		chai.request(baseUrl)
			.get('/documentation')
			.end((err,res)=>{
				expect(res).to.have.status(404);
				done();
			})
	})
});
describe('api',function(done){
	describe('When /:device/:password/config',function(done){

	});

});
