var _ = require('lodash');

var Grain = require('./grain');
var Hop = require('./hop');
var Yeast = require('./yeast');

function IngredientList(data){
	_.extend(this, data);
	this.grains = [];
	this.hops = [];
	this.yeasts = [];

	var self = this;
	if (Array.isArray(this.data.grain)){
		this.data.grain.forEach(function(grain){
			self.grains.push(new Grain(grain));
		});
	} else {
		this.grains.push(new Grain(this.data.grain));
	}

	if (Array.isArray(this.data.hops)){
		this.data.hops.forEach(function(hop){
			self.hops.push(new Hop(hop));
		});
	} else {
		this.hops.push(new Hop(this.data.hops));
	}

	if (Array.isArray(this.data.yeast)){
		this.data.yeast.forEach(function(yeast){
			self.yeasts.push(new Yeast(yeast));
		});
	} else {
		this.yeasts.push(new Yeast(this.data.yeast));
	}
}

module.exports = IngredientList;
