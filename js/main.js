'use strict';

var $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
const { getDesignerInfo } = require("./designer-info.js");
let displayTemplate = require('../templates/display-cards.hbs');
let headerTemplate = require('../templates/header.hbs');
let filterTemplate = require('../templates/filters.hbs');

// adds templates to DOM
getDesignerInfo()
.then( (data) => {
    addDescription(data);
    $('.filter').append(filterTemplate(getRooms(data)));
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

// gets all types of rooms for filter template
let getRooms = (data) => {
    let roomTypes = data.interiors.reduce( (acc, cur) => {
        if(acc.indexOf(cur['room-type']) < 0) {
            return acc.concat(cur['room-type']);
        } else {
            return acc;
        }
    }, []);
    return { roomTypes };
};

// click events for filter
$('.filter-btn').on('click', function() {
    $('.filter').slideToggle();
});

$(document).on('click', '.close-filter', function() {
    $('.filter').slideUp();
});