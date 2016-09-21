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



var data1 = {
    title: '标签一',
    list: ['文艺', '博客', '摄影']
};

var data2 = {
    title: '标签二',
    list: ['香蕉', '苹果', '大梨']
};

var html1 = template('tpl1', data1)
document.getElementById('list1').innerHTML = html1;

var html2 = template('tpl2', data2)
document.getElementById('list2').innerHTML = html2;