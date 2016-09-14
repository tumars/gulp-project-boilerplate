console.log('base.js')

$(document).ready(function($) {
    //auto adaptation
    var calculate_size = function() {
        // var BASE_FONT_SIZE = 100;
        var docEl = document.documentElement,
            clientWidth = document.body.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = (clientWidth / 10) + 'px';
    };
    // Abort if browser does not support addEventListener
    if (document.addEventListener) {
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        window.addEventListener(resizeEvt, calculate_size, false);
        document.addEventListener('DOMContentLoaded', calculate_size, false);
        calculate_size();
    }
});