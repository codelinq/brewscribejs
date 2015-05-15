var DocumentParser = require('./document-parser');

function Document(){
	
}

Document.prototype.recipes = [];

Document.prototype.styles = [];

Document.prototype.parse = function(file, done){
	var self = this;
	var parser = new DocumentParser();
	parser.on('node', function(node){
		self.recipes.push(node);
	});
	
	parser.on('end', function(){
		done();
	});
	
	parser.parse(file, 'Recipe');
};

module.exports = Document;