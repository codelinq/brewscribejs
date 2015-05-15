var _ = require('lodash');
var conversion = require('./conversion');

function Yeast(data){
	_.extend(this, data);
	
	this.flocculation_types = ['Low', 'Medium', 'High', 'Very High'];
	this.types = ['Ale', 'Lager', 'Wine', 'Champagne', 'Wheat'];
	this.forms = ['Liquid', 'Dry', 'Slant', 'Culture'];
	
	conversion.int_conv(this, ['product_id', 'flocculation', 'type', 'form', 'times_cultured', 'max_reuse']);
	conversion.date_conv(this, ['last_modified', 'brew_date', 'pkg_date', 'culture_date']);
	conversion.float_conv(this, ['starter_size', 'amount', 'price', 'cells', 'min_temp', 'max_temp']);
	conversion.bool_conv(this, ['in_recipe', 'use_starter', 'add_to_secondary']);
	conversion.percent_conv(this, ['min_attenuation', 'max_attenuation']);
	
	this.type = this.types[this.type];
	this.form = this.forms[this.form];
	this.flocculation = this.flocculation_types[this.flocculation];
}

module.exports = Yeast;