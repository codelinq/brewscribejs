require('should');
var Document = require('../lib/document');
var Recipe = require('../lib/recipe');

var Equipment = require('../lib/equipment');
var Mash = require('../lib/mash');
var Style = require('../lib/style');
var Carbonation = require('../lib/carbonation');
var IngredientList = require('../lib/ingredientlist')

var recipe_file = __dirname + '/brewlog.bsmx';

describe('Recipe', function(){
	var recipe = null;
	var document = null;
	
	before(function(done){
		document = new Document();
		document.parse(recipe_file, function(){
			recipe = new Recipe(document.parsed_recipes[0]);
			done();
		});
	});
	
	it('should convert the recipe data into properties', function(){
		recipe.brewer.should.eql('Scott');
	});
	
	it('should convert equipment to an Equipment object', function(){
		recipe.equipment.should.be.instanceOf(Equipment);
	});
	
	it('should convert mash into a Mash object', function(){
		recipe.mash.should.be.instanceOf(Mash);
	});
	
	it('should convert style into a Style object', function(){
		recipe.style.should.be.instanceOf(Style);
	});
	
	it('should convert carb into a Carbonation object', function(){
		recipe.carb.should.be.instanceOf(Carbonation);
	});
	
	it('should convert ingredients to an IngredientList', function(){
		recipe.ingredients.should.be.instanceOf(IngredientList);
	});
});