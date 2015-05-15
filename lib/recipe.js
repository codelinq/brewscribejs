var _ = require('lodash');
var conversion = require('./conversion');
var Equipment = require('./equipment');
var Mash = require('./mash');
var Style = require('./style');
var Carbonation = require('./carbonation');
var IngredientList = require('./ingredientlist');

function Recipe(data){
	_.extend(this, data);
	conversion.float_conv(this, ['boil_vol_measured', 'carb_vols', 'desired_ibu',
	'desired_color', 'desired_og', 'fg_measured', 'final_vol_measured', 'mash_ph', 
	'og_boil_measured', 'og_measured', 'og_primary', 'og_secondary', 'old_boil_vol',
	'rating', 'running_gravity', 'runoff_ph', 'starter_size', 'version', 'volume_measured']);
	
	conversion.date_conv(this, ['date', 'inv_date', 'last_modified']);
	conversion.bool_conv(this, ['include_starter', 'locked', 'rebalance_scale', 'stir_plate']);
	conversion.percent_conv(this, ['old_efficiency']);
	
	this.types = ['Extract', 'Partial Mash', 'All Grain'];
	
	this.type = this.types[parseInt(this.type)];
	this.equipment = new Equipment(this.equipment);
	this.mash = new Mash(this.mash);
	this.style = new Style(this.style);
	this.carb = new Carbonation(this.carb);
	this.ingredients = new IngredientList(this.ingredients);
}

Object.defineProperty(Recipe.prototype, 'abv', {
	get: function() { 
		return parseFloat((((1.05 * (this.og_measured - this.fg_measured)) / this.fg_measured) / 0.79 * 100).toFixed(2));
	}
});

Object.defineProperty(Recipe.prototype, 'abw', {
	get: function(){
		return this.abv * 0.79336;
	}
});

Object.defineProperty(Recipe.prototype, 'ibu', {
	get: function(){
		var ibus = 0;
		this.ingredients.hops.forEach(function(hop){
			ibus += hop.ibu_contrib;
		});
		
		return parseFloat((ibus * 1000).toFixed(1));
	}
});

Object.defineProperty(Recipe.prototype, 'srm', {
	get: function(){
		var mcu = 0;
		var self = this;
		this.ingredients.grains.forEach(function(grain){
			var grain_pounds = grain.amount / 16.0;
			mcu += ((grain.color * grain_pounds) / self.volume_in_gallons);
		});
		
		return parseFloat((1.4922 * Math.pow(mcu, 0.6859)).toFixed(1));
	}
});

Object.defineProperty(Recipe.prototype, 'original_gravity', {
	get: function(){
		return 1 + parseFloat(((this.total_ppg / this.volume_in_gallons) * 0.001).toFixed(3));
	}
});

Object.defineProperty(Recipe.prototype, 'total_ppg', {
	get: function(){
		var ppg = 0;
		var self = this;
		this.ingredients.grains.forEach(function(grain){
			ppg += (grain.total_ppg * self.equipment.efficiency);
		});
		return ppg;
	}
});

Object.defineProperty(Recipe.prototype, 'volume_in_gallons', {
	get: function(){
		return this.equipment.batch_vol / 128.0;
	}
});
module.exports = Recipe;