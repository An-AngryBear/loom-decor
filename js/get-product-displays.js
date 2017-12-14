'use strict';

var $ = require('jquery');
const productDisplay = {};

productDisplay.getProductDisplay = function() {
	return new Promise( (resolve, reject) => {
		$.ajax({
			url: "../data/lucy-loom-products.json"
		})
		.done( (data) => {
            console.log("lucy loom products", data);
			resolve(data);
		})
		.fail( (error) => {
			console.log("error", error.statusText);
		});
	});
};

module.exports = productDisplay;