'use strict';

var $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
const { getDesignerInfo } = require("./designer-info.js");
let displayTemplate = require('../templates/display-cards.hbs');

// adds display templates to DOM
getDesignerInfo()
.then( (data) => {
    $('.img-container').append(displayTemplate(data));
});