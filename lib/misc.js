var _ = require('lodash');
var conversion = require('./conversion');

function Misc(data){
	_.extend(this, data);

	conversion.float_conv(this, ['amount', 'price']);
	conversion.int_conv(this, ['use', 'type', 'form', 'units']);

	this.types = ['Spice', 'Fining', 'Herb', 'Flavor', 'Other', 'Water Agent'];
	this.uses = ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling'];
    this.unit_types = ['mg', 'g', 'oz', 'lb', 'kg', 'ml', 'tsp', 'tbsp', 'Cup', 'pt', 'qt', 'l', 'gal', 'items'];

	this.use = this.uses[this.use];
	this.type = this.types[this.type];
    this.units = this.unit_types[this.units];
}

module.exports = Misc;
