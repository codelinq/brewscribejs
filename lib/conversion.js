module.exports = {
	float_conv: function(obj, props){
		props.forEach(function(prop){
			obj[prop] = parseFloat(obj[prop]);
		});
	},
	date_conv: function(obj, props){
		props.forEach(function(prop){
			obj[prop] = new Date(obj[prop]);
		});
	},
	bool_conv: function(obj, props){
		props.forEach(function(prop){
			obj[prop] = obj[prop] == '1';
		});
	},
	percent_conv: function(obj, props){
		props.forEach(function(prop){
			obj[prop] = parseFloat(obj[prop]) * 0.001;
		});
	},
	int_conv: function(obj, props){
		props.forEach(function(prop){
			obj[prop] = parseInt(obj[prop]);
		});
	}
};