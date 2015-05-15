var _ = require('lodash');
var conversion = require('./conversion');

function Hop(data){
	_.extend(this, data);
	
	conversion.float_conv(this, ['alpha', 'beta', 'amount', 'hsi', 'price']);
	conversion.int_conv(this, ['boil_time', 'dry_hop_time', 'use', 'type', 'form']);
	conversion.percent_conv(this, ['percent', 'ibu_contrib']);
	conversion.bool_conv(this, ['in_recipe']);
	
	this.types = ['Bittering', 'Aroma', 'Both'];
	this.forms = ['Pellet', 'Plug', 'Leaf'];
	this.uses = ['Boil', 'Dry Hop', 'Mash', 'First Wort', 'Aroma'];
	
	this.use = this.uses[this.use];	
	this.type = this.types[this.type];
	this.form = this.forms[this.form];
}

module.exports = Hop;