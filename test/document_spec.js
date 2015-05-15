var should = require('should');
var Document = require('../lib/document');

describe('Document', function(){
	var recipe_file = __dirname + '/brewlog.bsmx';
	var subject = null;
	
	before(function(done){
		subject = new Document();
		subject.parse(recipe_file, done);
	});
	
	describe('parse', function(){
		
		it('should add a Recipe to recipes when a Recipe entry is found', function(){
			subject.recipes.length.should.be.above(0);
		});
		
	});
});