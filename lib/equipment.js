var _ = require('lodash');
var conversion = require('./conversion');

function Equipment(data){
	_.extend(this, data);
	
	conversion.float_conv(this, ['mash_vol', 'tun_mass', 'boil_time', 
	'tun_specific_heat', 'tun_deadspace', 'boil_vol', 'boil_off', 
	'trub_loss', 'top_up_kettle', 'batch_vol', 'fermenter_loss', 'top_up']);
	
	conversion.date_conv(this, ['last_modified']);
	conversion.bool_conv(this, ['boil_rate_flag', 'calc_boil', 'equip_39', 'tun_adj_deadspace']);
	conversion.percent_conv(this, ['old_evap_rate', 'cool_pct', 'hop_util']);
	
	this.efficiency = parseFloat(this.efficiency) * 0.01;
}

module.exports = Equipment;