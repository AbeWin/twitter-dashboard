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
            // adding a marker to the map, map is defined in file flot.js
            var marker = new google.maps.Marker({position: {lng: coords[0], lat: coords[1]}, map: map});
	    // create secret message and add to map
	    var secretMessage = message.values[1];
	    var infoWindow = new google.maps.InfoWindow({
		content: secretMessage
	    });
	    //Add listener for event click to display secret message
	    marker.addListener('click', function() {
		infoWindow.open(marker.get(map), marker);
	    });
        }
	})
    };
    return this.$element;
}
)(jQuery, block);
