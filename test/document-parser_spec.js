var should = require('should');
var DocumentParser = require('../lib/document-parser');
var fs = require('fs');

describe('DocumentParser', function(){
	var recipe_file = __dirname + '/brewlog.bsmx';
	var parser = null;

	before(function(){
		parser = new DocumentParser();
	});

	describe('parse', function(){

		it('should parse a node when a node is found', function(done){

			var nodes = [];

			parser.on('node', function(node){
				nodes.push(node);
			});

			parser.on('end', function(){
				nodes.length.should.be.above(0);
				done();
			});

			var buf = fs.readFileSync(recipe_file);
			parser.parse(buf, 'Recipe');

		});

	});

	describe('clean_key', function(){

		it('converts an ugly key into something more readable', function(){
			parser.clean_key('F_Y_BREW_DATE').should.eql('brew_date');
		});

		it('converts _MOD_ key to last_modified', function(){
			parser.clean_key('_MOD_').should.eql('last_modified');
		});
	});

	describe('xml_to_json', function(){

		it('converts xml to a corresponding JSON object', function(done){
			var xml = '<foo><bar><baz>1</baz></bar><bazaar>2</bazaar></foo>';
			var expected = { foo : { bar: { baz: '1' }, bazaar: '2'} };
			parser.xml_to_json(xml, function(err, actual){
				actual.should.eql(expected);
				done();
			});
		});

	});
});
