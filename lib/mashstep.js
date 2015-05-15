var _ = require('lodash');
var conversion = require('./conversion');

function Mashstep(data){
	_.extend(this, data);
	this.types = ['Infusion', 'Decoction', 'Temperature'];
	conversion.date_conv(this, ['last_modified']);
	conversion.int_conv(this, ['type', 'step_time', 'rise_time']);
	conversion.float_conv(this, ['infusion', 'step_temp', 'tun_addition',
	'tun_vol', 'tun_temp', 'tun_mass', 'start_temp', 'grain_temp', 'start_vol', 
	'grain_weight', 'infusion_temp', 'decoction_amt', 'tun_hc']);
	this.type = this.types[this.type];
}

module.exports = Mashstep;