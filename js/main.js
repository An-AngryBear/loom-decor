'use strict';

var $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
const { getDesignerInfo, getInteriors } = require("./designer-info.js");
let displayTemplate = require('../templates/display-cards.hbs');



getInteriors()
.then( (data) => {
    console.log("get interiors");
    $('.img-container').append(displayTemplate(data));
});