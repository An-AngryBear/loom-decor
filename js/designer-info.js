'use strict';

var $ = require('jquery');
const designerInfo = {};

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