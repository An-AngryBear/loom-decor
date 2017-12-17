'use strict';

var $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
const { getDesignerInfo } = require("./designer-info.js");
let displayTemplate = require('../templates/display-cards.hbs');
let headerTemplate = require('../templates/header.hbs');

// adds templates to DOM
getDesignerInfo()
.then( (data) => {
    addDescription(data);
    $('.img-container').append(displayTemplate(data));
    $('.page-header').append(headerTemplate(data.designer));
});

// formats the product types into paragraph form
let typesToPForm = (names) => {
    let nameOutput = names.map( (name) => {
        return name.name;
    });
    if(nameOutput.length > 1) {
        nameOutput.splice(nameOutput.length - 2, 2, nameOutput[nameOutput.length - 2] + ' and ' + nameOutput[nameOutput.length - 1]);
    }
    nameOutput = nameOutput.join(", ");
    return nameOutput;
};

// adds product description to template data
let addDescription = (data) => {
    data.interiors.forEach( (interior) => {
        interior.description = typesToPForm(interior.types);
    });
};

// click events for filter
$('.filter-btn').on('click', function() {
    $('.filter').slideToggle();
});

$(document).on('click', '.close-filter', function() {
    $('.filter').slideUp();
});