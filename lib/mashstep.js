var _ = require('lodash');
var conversion = require('./conversion');

function Mashstep(data){
	_.extend(this, data);
	
}

module.exports = Mashstep;