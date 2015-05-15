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
	
	var types = ['Extract', 'Partial Mash', 'All Grain'];
	
	this.type = types[parseInt(this.type)];
	this.equipment = new Equipment(this.equipment);
	this.mash = new Mash(this.mash);
	this.style = new Style(this.style);
	this.carb = new Carbonation(this.carb);
	this.ingredients = new IngredientList(this.ingredients);
}

module.exports = Recipe;