var _ = require('lodash');
var conversion = require('./conversion');

function Grain(data){
	_.extend(this, data);
	this.types = ['Grain', 'Extract Sugar', 'Adjunct', 'Dry Extract'];
	
	conversion.float_conv(this, ['amount', 'color', 'yield', 'price', 'ibu_gal_per_lb', 'late_extract']);
	conversion.int_conv(this, ['boil_time', 'type']);
	conversion.percent_conv(this, ['percent', 'max_in_batch', 'protien', 'diastatic_power', 'moister', 'coarse_fine_diff']);
	conversion.bool_conv(this, ['add_after_boil', 'recommend_mash', 'in_recipe']);
	
	this.yield *= 0.01;
	this.type = this.types[this.type];
}

Object.defineProperty(Grain.prototype, 'ppg', {
	get: function(){
		return this.yield * 46.214;
	}
});

Object.defineProperty(Grain.prototype, 'total_ppg', {
	get: function(){
		return this.ppg * this.in_pounds;
	}
});

Object.defineProperty(Grain.prototype, 'in_pounds', {
	get: function(){
		return this.amount / 16.0;
	}
});

module.exports = Grain;