var _ = require('lodash');
var conversion = require('./conversion');

function Style(data){
	_.extend(this, data);
	
	this.types = ['Ale', 'Lager', 'Mixed', 'Mead', 'Cider', 'Wheat'];
	conversion.date_conv(this, ['last_modified']);
	conversion.float_conv(this, ['min_og', 'max_og', 'min_fg', 'max_fg', 
	'min_ibu', 'max_ibu', 'min_color', 'max_color']);
	conversion.int_conv(this, ['number', 'type', 'letter']);
	conversion.percent_conv(this, ['min_abv', 'max_abv']);
	
	this.type = this.types[this.type];
	var alphabet = [];
	for (var index = 65; index < 91; index++) {
		alphabet.push(String.fromCharCode(index));
	}
	this.letter = alphabet[this.letter - 1];
	this.examples = this.examples.split(', ');
}

module.exports = Style;