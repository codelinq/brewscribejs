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
	var parser = new xml2js.Parser();
	var chunks = [];
	fs.createReadStream(file)
	.pipe(xmlNodes(node))
	.on('data', function(chunk){
		chunks.push(chunk.toString('utf8'));
	})
	.on('end', function(){
		chunks.forEach(function(xml){
			parser.parseString(xml, function(err, result){
				clean_object(result, function(err, node){
					self.emit('node', node);
				});
			});
		});
		self.emit('end');
	});
};

var clean_object = function(obj, callback){
	var doc = {};
	var props = Object.keys(obj);
	var left = props.length;
	
	props.forEach(function(prop){
		var key = clean_key(prop);
		if (Array.isArray(obj[prop])){
			clean_array(obj[prop], function(err, newobj){
				doc[key] = newobj;
			});
		} else if (typeof obj[prop] === 'object'){
			clean_object(obj[prop], function(err, newobj){
				doc[key] = newobj;
			});
		} else {
			doc[key] = obj[prop];
		}
		if (--left === 0){
			callback(null, doc);
		}
	});
	
	
};
var clean_array = function(array, callback){
	
	if (array.length > 1){
		var temp = [];
		var left = array.length;
		
		array.forEach(function(item){
			if (Array.isArray(item)){
				clean_array(item, function(err, obj){
					temp.push(obj);
				});
			} else if (typeof item === 'object') {
				clean_object(item, function(err, obj){
					temp.push(obj);
				});
			} else {
				temp.push(item);
			}
			if (--left === 0){
				callback(null, temp);
			}
		});
		
	} else if (Array.isArray(array[0])) {
		console.log ('array 0');
		// do somethign with an array
	} else if (typeof array[0] === 'object'){
		clean_object(array[0], function(err, obj){
			callback(null, obj);
		});
	} else {
		callback(null, array[0]);
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

