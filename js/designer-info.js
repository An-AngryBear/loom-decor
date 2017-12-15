'use strict';

var $ = require('jquery');
const designerInfo = {};

designerInfo.getInteriors = function() {
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

designerInfo.getDesignerInfo = function() {
	return new Promise( (resolve, reject) => {
		$.ajax({
			url: "../data/lucy-loom.json"
		})
		.done( (data) => {
			resolve(data.designer);
		})
		.fail( (error) => {
			console.log("error", error.statusText);
		});
	});
};

module.exports = designerInfo;