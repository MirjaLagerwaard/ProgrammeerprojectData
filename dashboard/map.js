/*
# Name: Mirja Lagerwaard
# Student number: 10363149
*/
function initMap() {
   var syria = {lat: 34.75139, lng:  38.26806};
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 7,
     center: syria,
    scrollwheel: false
   });
}
