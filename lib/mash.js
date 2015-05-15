var _ = require('lodash');
var conversion = require('./conversion');
var Mashstep = require('./mashstep');

function Mash(data){
	_.extend(this, data);
	
	conversion.date_conv(this, ['last_modified']);
	
	conversion.float_conv(this, ['grain_weight', 'grain_temp', 'boil_temp',
	'tun_temp', 'ph', 'sparge_temp', 'batch', 'tun_deadspace', 'biab_vol',
	'tun_vol', 'tun_mass', 'tun_hc']);
	
	conversion.percent_conv(this, ['batch_pct']);
	
	conversion.bool_conv(this, ['batch_even', 'batch_drain', 'mash_39', 
	'biab', 'equip_adjust']);
	
	var steps = [];
	if (Array.isArray(this.steps)){
		steps = this.steps;
	} else {
		steps.push(this.steps);
	}
	this.steps = [];
	var self = this;
	steps.forEach(function (step) {
		self.steps.push(new Mashstep(step));
	});
}

module.exports = Mash;