(function($, block) {

block.fn.map = function(config) {
    // handle configuration (no configuration needed for our purpose)
    var options = $.extend({
    }, config);
    // register action add to add a marker
    this.actions({
        add: function(e, message) {
            // get the coordinates from the event
            coords = message.value;
            var LngLat = new google.maps.LatLng(coords);
            // adding a marker to the map
            var marker = new google.maps.Marker({position: {lng: coords[0], lat: coords[1]}, map: map});
        }
    });
    return this.$element;
}
})(jQuery, block);
