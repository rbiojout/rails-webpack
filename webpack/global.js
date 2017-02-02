// jQuery is imported as a Global
require('expose?$!expose?jQuery!jquery');

// unobstructive javascript
require('jquery-ujs');
// jquery user interactions
// adjust import of css in the global css file accordingly to imports of jQueryUI
require('jquery-ui/ui/core');
require('jquery-ui/ui/widget');
require('jquery-ui/ui/widgets/sortable');

require('jquery-ui/ui/widgets/mouse');

// to solve the problems of touch in jQuery UI
// need to be imported AFTER jQueryUI
// and before the first usage
require('jquery-ui-touch-punch');

// uploader file
// require('jquery-file-upload');

// parallax effect
require('stellar');

// ellipsis for the text to long
// use the src as the file name is not correct
require('jquery-dotdotdot/src/jquery.dotdotdot');

// position of the mouse on the screen
require('jquery-waypoints/waypoints');

// bootstrap
require('bootstrap-sass/assets/javascripts/bootstrap-sprockets');

// usage of moment in i18n context
require('moment');
require('moment/locale/fr');

// calendars for bootstrap
require('bootstrap-datetime-picker');

// WYSIWYG Summernote
// some links to bootstrap js needed
require('bootstrap-sass/assets/javascripts/bootstrap/transition');
require('bootstrap-sass/assets/javascripts/bootstrap/modal.js');
require('bootstrap-sass/assets/javascripts/bootstrap/dropdown.js');
require('bootstrap-sass/assets/javascripts/bootstrap/tooltip.js');
require('summernote/dist/summernote');



// require('material-kit-free/assets/js/material-kit');

// import './global.scss';

console.log("Hello the world!");
