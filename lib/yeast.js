var _ = require('lodash');

function Yeast(data){
	_.extend(this, data);
}

module.exports = Yeast;