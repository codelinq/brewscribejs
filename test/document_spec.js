var should = require('should');
var DocumentParser = require('./../lib/DocumentParser');

describe('document_parser', function(){
	it('should spit out lines', function(done){
		this.timeout(7000);
		var parser = new DocumentParser();
		var nodes = [];
		
		parser.on('node', function(node){
			nodes.push(node);	
		});
		
		parser.on('end', function(){
			nodes.forEach(function(node){
				console.log(node.recipe.name);
			});
			done();
		});
		
		parser.parse(__dirname + '/brewlog.bsmx', 'Recipe');
	});
});

