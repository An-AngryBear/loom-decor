'use strict';

var $ = require('jquery');
const designerInfo = {};

// GETs designer info from data folder
designerInfo.getDesignerInfo = function() {
	return new Promise( (resolve, reject) => {
		$.ajax({
			url: "../data/lucy-loom.json"
		})
		.done( (data) => {
			resolve(data);
		})
		.fail( (error) => {
			console.log("error", error.statusText);
		});
	});
};

module.exports = designerInfo;