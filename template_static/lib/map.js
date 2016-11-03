(function($, block) {

block.fn.map = function(config) {
    // handle configuration (no configuration needed for our purpose)
    var options = $.extend({
    }, config);
    // register action add to add a marker
    this.actions({
        add: function(e, message) {
            // get the coordinates from the event
            coords = message.values[0];
            var LngLat = new google.maps.LatLng(coords);
            // adding a marker to the map
            var marker = new google.maps.Marker({position: {lng: coords[0], lat: coords[1]}, map: map});
			var secretMessage = message.values[1];
			var infoWindow = new google.maps.InfoWindow({
				content: secretMessage
			});
			marker.addListener('click', function() {
				infoWindow.open(marker.get(map), marker);
			});
        }
		})
    };
    return this.$element;
}
)(jQuery, block);
