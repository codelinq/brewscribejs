require('should');
var describe = require('mocha').describe;
var it = require('mocha').it;
var before = require('mocha').before;

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

	it('should set floats to numbers and dates to dates', function(){
		recipe.boil_vol_measured.should.be.Number;
		recipe.carb_vols.should.be.Number;
		recipe.desired_ibu.should.be.Number;
		recipe.desired_color.should.be.Number;
		recipe.desired_og.should.be.Number;
		recipe.fg_measured.should.be.Number;
		recipe.mash_ph.should.be.Number;
		recipe.og_boil_measured.should.be.Number;
		recipe.og_measured.should.be.Number;
		recipe.og_primary.should.be.Number;
		recipe.og_secondary.should.be.Number;
		recipe.old_boil_vol.should.be.Number;
		recipe.old_efficiency.should.be.Number;
		recipe.running_gravity.should.be.Number;
		recipe.runoff_ph.should.be.Number;
		recipe.starter_size.should.be.Number;
		recipe.rating.should.be.Number;
		recipe.version.should.be.Number;
		recipe.volume_measured.should.be.Number;
		recipe.date.should.be.Date;
		recipe.inv_date.should.be.Date;
		recipe.last_modified.should.be.Date;
	});

	it('should set the type to one of the TYPES', function(){
		recipe.types.should.containEql(recipe.type);
	});

	it('should set include_starter to boolean', function(){
		[true, false].should.containEql(recipe.include_starter);
	});

	it('should set locked to boolean', function(){
		[true, false].should.containEql(recipe.locked);
	});

	it('should set rebalance_scale to boolean', function(){
		[true, false].should.containEql(recipe.rebalance_scale);
	});

	it('should set stir_plate to boolean', function(){
		[true, false].should.containEql(recipe.stir_plate);
	});

	describe('calculation method', function(){
		it('og_measured should be 1.062', function(){
			recipe.og_measured.should.be.eql(1.062);
		});

		it('fg_measured should be 1.004', function(){
			recipe.fg_measured.should.be.eql(1.004);
		});

		it('abv should calculate to 7.68', function(){
			recipe.abv.should.be.eql(7.68);
		});

		it('second recipe should not contain the same getter values', function(){
			recipe.name.should.not.eql(document.recipes[1].name);
			recipe.og_measured.should.not.be.eql(document.recipes[1].og_measured);
			recipe.fg_measured.should.not.be.eql(document.recipes[1].fg_measured);
			recipe.abv.should.not.be.eql(document.recipes[1].abv);
		});
	});

	it('ibu should be 66.4', function(){
		recipe.ibu.should.be.eql(66.4);
	});

	it('srm should be 6.1', function(){
		recipe.srm.should.be.eql(6.1);
	});

	it('estimated original gravity should be 1.074', function(){
		recipe.original_gravity.should.be.eql(1.074);
	});
});
