var mocha = require('mocha');
var should = require('should');
var fs = require('fs');
var folder = process.env.HOME + '/documents/beersmith2';
var xml2js = require('xml2js');
/*
describe('xml2js', function(){
	it('should load a file', function(done){
		this.timeout(7000);
		fs.readFile(folder + '/recipe.bsmx', 'utf8', function(err, xml){
			if (err) throw err;
			done();
		});
	});
});
*/