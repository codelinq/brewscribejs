var _ = require('lodash');
var conversion = require('./conversion');

function Misc(data){
	_.extend(this, data);

	conversion.float_conv(this, ['amount', 'price']);
	conversion.int_conv(this, ['use', 'type', 'form']);

	this.types = ['Spice', 'Fining', 'Herb', 'Flavor', 'Other', 'Water Agent'];
	this.uses = ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling'];

	this.use = this.uses[this.use];
	this.type = this.types[this.type];
}

module.exports = Misc;
