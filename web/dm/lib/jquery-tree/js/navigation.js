$(function () {
    $('#webmenu li').hover(function () {
        $(this).children('ul').stop(true, true).show('slow');
    }, function () {
        $(this).children('ul').stop(true, true).hide('slow');
    });

    $('#webmenu li').hover(function () {
        $(this).children('div').stop(true, true).show('slow');
    }, function () {
        $(this).children('div').stop(true, true).hide('slow');
    });
});