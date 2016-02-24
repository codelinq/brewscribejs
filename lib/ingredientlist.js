var _ = require('lodash');

var Grain = require('./grain');
var Hop = require('./hop');
var Yeast = require('./yeast');
var Misc = require('./misc');
function IngredientList(data){
	_.extend(this, data);
	this.grains = [];
	this.hops = [];
	this.yeasts = [];
	this.misc = [];

	var self = this;
	if (Array.isArray(this.data.grain)){
		this.data.grain.forEach(function(grain){
			self.grains.push(new Grain(grain));
		});
	} else if (this.data.grain){
		this.grains.push(new Grain(this.data.grain));
	}

	if (Array.isArray(this.data.hops)){
		this.data.hops.forEach(function(hop){
			self.hops.push(new Hop(hop));
		});
	} else if (this.data.hops) {
		this.hops.push(new Hop(this.data.hops));
	}

	if (Array.isArray(this.data.yeast)){
		this.data.yeast.forEach(function(yeast){
			self.yeasts.push(new Yeast(yeast));
		});
	} else if (this.data.yeast) {
		this.yeasts.push(new Yeast(this.data.yeast));
	}

	if (Array.isArray(this.data.misc)){
		this.data.misc.forEach(function(misc){
			self.misc.push(new Misc(misc));
		})
	} else if (this.data.misc){
		this.misc.push(new Misc(this.data.misc));
	}
}

module.exports = IngredientList;
