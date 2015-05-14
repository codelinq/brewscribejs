var Document = require('./lib/document');

module.exports = {
	'import' : function(file, callback){
		var document = new Document(file);
		callback(null, document);
	}
};