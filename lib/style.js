var _ = require('lodash');
var conversion = require('./conversion');

function Style(data){
	_.extend(this, data);
}

module.exports = Style;