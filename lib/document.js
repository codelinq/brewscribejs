var DocumentParser = require('./document-parser');
var Recipe = require('./recipe');

function Document(){
	
}

Document.prototype.parsed_recipes = [];
Document.prototype.recipes = [];

Document.prototype.styles = [];

Document.prototype.parse = function(file, done){
	var self = this;
	var parser = new DocumentParser();
	parser.on('node', function(node){
		if (node.recipe){
			self.parsed_recipes.push(node.recipe);
			self.recipes.push(new Recipe(node.recipe));
		}
	});
	
	parser.on('end', function(){
		done();
	});
	
	parser.parse(file, 'Recipe');
};

module.exports = Document;