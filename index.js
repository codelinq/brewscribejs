var Document = require('./lib/document');

module.exports = {
	'import' : function(file, callback){
		var document = new Document();
		document.parse(file, function(){
			callback(null, document);
		});
	}
};