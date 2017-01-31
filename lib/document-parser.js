var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var xmlNodes = require('xml-nodes')
var xml2js = require('xml2js');
var BufferStream = require('./bufferstream');
function DocumentParser(){
	EventEmitter.call(this);
}

util.inherits(DocumentParser, EventEmitter);

DocumentParser.prototype.parse = function(file, node){
	var self = this;
	var chunks = [];

	var stream;
	if (Buffer.isBuffer(file)){
		stream = new BufferStream(file);
	} else {
		stream = fs.createReadStream(file);
	}
	stream
	.pipe(xmlNodes(node))
	.on('data', function(chunk){
		chunks.push(chunk.toString('utf8'));
	})
	.on('end', function(){
		chunks.forEach(function(xml){
			self.xml_to_json(xml, function(err, node){
				self.emit('node', node);
			});
		});
		self.emit('end');
	});
};

DocumentParser.prototype.xml_to_json = function(xml, callback){
	var parser = new xml2js.Parser();
	var self = this;
	parser.parseString(xml, function(err, result){
		self.clean_object(result, function(err, node){
			callback(null, node);
		});
	});
};

DocumentParser.prototype.clean_object = function(obj, callback){
	var doc = {};
	var props = Object.keys(obj);
	var left = props.length;
	var self = this;

	props.forEach(function(prop){
		var key = self.clean_key(prop);
		if (Array.isArray(obj[prop])){
			self.clean_array(obj[prop], function(err, newobj){
				doc[key] = newobj;
			});
		} else if (typeof obj[prop] === 'object'){
			self.clean_object(obj[prop], function(err, newobj){
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

DocumentParser.prototype.clean_array = function(array, callback){
	var self = this;

	if (array.length > 1){
		var temp = [];
		var left = array.length;

		array.forEach(function(item){
			if (Array.isArray(item)){
				self.clean_array(item, function(err, obj){
					temp.push(obj);
				});
			} else if (typeof item === 'object') {
				self.clean_object(item, function(err, obj){
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
		self.clean_object(array[0], function(err, obj){
			callback(null, obj);
		});
	} else {
		callback(null, array[0]);
	}
};

DocumentParser.prototype.clean_key = function(key){
	var extracted = key.match(/(F_(\w{1,2}_)?)?(_MOD_|.+)/)[3];
	if (extracted == '_MOD_'){
		return 'last_modified';
	} else {
		return extracted.toLowerCase();
	}
};

module.exports = DocumentParser;
