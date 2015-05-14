var should = require('should');
var Brewscribe = require('../');
var Document = require('../lib/document');

describe('Brewscribe', function(){
	var recipe_file = __dirname + '/brewlog.bsmx';
	
	describe('import', function(){
		
		it('should return a Document object', function(done){
			Brewscribe.import(recipe_file, function(err, recipe){
				recipe.should.be.instanceOf(Document);
				done();
			});
		});
		
	});
});