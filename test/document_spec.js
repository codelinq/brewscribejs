var should = require('should');
var DocumentParser = require('./../lib/DocumentParser');

describe('document_parser', function(){
	it('should spit out lines', function(done){
		this.timeout(7000);
		var parser = new DocumentParser();
		
		parser.on('node', function(node){
			if (node && node.recipe){
				console.log(node.recipe.name);
			}
				
		});
		parser.on('end', function(){
			done();
		});
		parser.parse(__dirname + '/brewlog.bsmx', 'Recipe');
	});
});

