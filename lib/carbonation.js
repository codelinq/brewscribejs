var _ = require('lodash');
var conversion = require('./conversion');

function Carbonation(data){
	_.extend(this, data);
	this.types = ['Bottle', 'Keg', 'Keg with priming sugar'];
	conversion.percent_conv(this, ['carb_rate']);
	conversion.float_conv(this, ['temperature']);
	conversion.int_conv(this, ['type']);
	conversion.date_conv(this, ['last_modified']);
	this.type = this.types[this.type];
};

module.exports = Carbonation;