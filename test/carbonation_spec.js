require('should');
var describe = require('mocha').describe;
var it = require('mocha').it;

var Document = require('../lib/document');
var Carbonation = require('../lib/carbonation');

var recipe_file = __dirname + '/brewlog.bsmx';


describe('Carbonation', function(){
	var document = null;
	var carbonation = null;
	
	before(function(done){
		document = new Document();
		document.parse(recipe_file, function(){
			carbonation = document.recipes[0].carb;
			done();
		});
	});
	
	it('should be a Carbonation', function(){
		carbonation.should.be.instanceOf(Carbonation);
	});
	
	it('carb_rate should be number', function(){
		carbonation.carb_rate.should.be.Number;
	});
	
	it('temperature should be a number', function(){
		carbonation.temperature.should.be.Number;
	});
	
	it('last_modified should be a Date', function(){
		carbonation.last_modified.should.be.Date;
	});
	
	it('type should be one of the Carbonation.types', function(){
		carbonation.types.should.containEql(carbonation.type);
	});
});