require('should');
var describe = require('mocha').describe;
var it = require('mocha').it;

var conversion = require('../lib/conversion');

describe('Conversion', function(){
	describe('percent_conv', function(){
		it('converts to a float and shifts by 0.01', function(){
			var obj = {k: '1.01'};
			conversion.percent_conv(obj, ['k']);
			obj.k.should.eql(0.00101);
		});
	});
	
	describe('float_conv', function(){
		it('converts to a float', function(){
			var obj = {k: '15.044'};
			conversion.float_conv(obj, ['k']);
			obj.k.should.eql(15.044);
		});
	});
	
	describe('bool_conv', function(){
		it('converts 1 to true', function(){
			var obj = {k: '1'};
			conversion.bool_conv(obj, ['k']);
			obj.k.should.be.true;
		});
		
		it('converts 0 to false', function(){
			var obj = {k: '0'};
			conversion.bool_conv(obj, ['k']);
			obj.k.should.be.false;	
		});
	});
});