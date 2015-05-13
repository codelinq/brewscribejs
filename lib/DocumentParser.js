var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var xmlNodes = require('xml-nodes')
var xml2js = require('xml2js');

function DocumentParser(){
	EventEmitter.call(this);
}

util.inherits(DocumentParser, EventEmitter);

DocumentParser.prototype.parse = function(file, node){
	var self = this;
	
	fs.createReadStream(file)
	.pipe(xmlNodes(node))
	.on('data', function(chunk){
		var xml = chunk.toString('utf8');
		var parser = new xml2js.Parser();
		parser.parseString(xml, function(err, result){
			self.emit('node', clean_object(result));
		});
	})
	.on('end', function(){
		self.emit('end');
	});
};

var clean_object = function(obj){
	var doc = {}
	for (var prop in obj){
		var key = clean_key(prop);
		if (Array.isArray(obj[prop])){
			doc[key] = clean_array(obj[prop]);
		} else if (typeof obj[prop] === 'object'){
			doc[key] = clean_object(obj[prop]);
		} else {
			doc[key] = obj[prop];
		}
	}
	return doc;
};
var clean_array = function(array){
	
	if (array.length > 1){
		var temp = [];
		array.forEach(function(item){
			if (Array.isArray(item)){
				temp.push(clean_array(item));
			} else if (typeof item === 'object') {
				temp.push(clean_object(item));
			} else {
				temp.push(item);
			}
		});
		return temp;
	} else if (Array.isArray(array[0])) {
		console.log ('array 0');
		// do somethign with an array
	} else if (typeof array[0] === 'object'){
		return clean_object(array[0]);
	} else {
		return array[0];
	}
};

var clean_key = function(key){
	var extracted = key.match(/(F_(\w{1,2}_)?)?(_MOD_|.+)/)[3];
	if (extracted == '_MOD_'){
		return 'last_modified';
	} else {
		return extracted.toLowerCase();
	}
};

module.exports = DocumentParser;

