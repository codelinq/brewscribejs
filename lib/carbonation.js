var _ = require('lodash');
var conversion = require('./conversion');

function Carbonation(data){
	_.extend(this, data);
};

module.exports = Carbonation;