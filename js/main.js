'use strict';

var $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
const { getDesignerInfo } = require("./designer-info.js");
let displayTemplate = require('../templates/display-cards.hbs');
let headerTemplate = require('../templates/header.hbs');
let filterTemplate = require('../templates/filters.hbs');

// adds templates to DOM
let loadAllRooms = () => {
    $('.img-container').empty();
    getDesignerInfo()
    .then( (data) => {
        addDescription(data);
        $('.filter').append(filterTemplate(getRooms(data)));
        $('.img-container').append(displayTemplate(data));
        $('.page-header').append(headerTemplate(data.designer));
    });
};

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

// filters through data looking for room-type. appends filtered data to DOM
let filterByRoom = (roomType) => {
    $('.img-container').empty();    
    getDesignerInfo()
    .then( (data) => {
        data.interiors = data.interiors.filter( (room) => {
            if(room['room-type'] === roomType) {
                return room;
            }
        });
        addDescription(data);
        $('.img-container').append(displayTemplate(data));
    });
};

// let addClearBtn = () => {
//     $('')
// }

// ********click events for filter********

    //toggles filter with click of filter button
$('.filter-btn').on('click', function() {
    $('.filter').slideToggle();
});

    //closes filter with click of 'X'
$(document).on('click', '.close-filter', function() {
    $('.filter').slideUp();
});

    //filters based on room-type
$(document).on('click', '.room-list-item', function() {
    let roomType = $(this).attr('data');
    filterByRoom(roomType);
});

// ********page initialization********
loadAllRooms();