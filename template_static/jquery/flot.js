$(document).ready(function(){
    block('#tweetcounter').rolling_chart({
        memory: 75,
        series: {
            'sensor0' : {}
        },
        chart: {
            yaxis:{
                min: -100,
                max: 100
            },
            xaxis: {
                show:false
            }
        }
    });
    
    block('#wolk').wordcloud({
        //Applying logarithmic filter for rare hashtags
        filter_function: function(cat, val, max) {
            return Math.pow(val, (1/Math.log10(max))) > 1.8
            },
        //Calculating logarithmic weightfactor from 1 to 10
        weight_function: function(cat, val, max) {
            return Math.round(Math.pow(val, (1/Math.log10(max))))
        }
    });
    block('#tweetfeed').tweets({
    memory: 5
    });
    block('#populartweetfeed').tweets({
    memory: 3
    });
});
function initMap() {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {zoom: 9, center: {lat: 51.99780, lng: 6.44820}, mapTypeId: 'roadmap'});
}
(function($, block) {

block.fn.map = function(config) {
    // handle configuration
    var options = $.extend({
        size: '64pt',
        text: 'RED',
        color: 'red'
    }, config);

    // create HTML representation
    var $el = $('<span></span>').appendTo(this.$element);
    $el.css('font-size', options.size);

    // create HTML element for display
    var data = {
        text: options.text,
        color: options.color
    }

    // update function to update element
    var update = function() {
        $el.text(data.text+'!').css('color', data.color);
    }

    // invoke update to initialise the display
    update();

    // register actions
    this.actions({
        word: function(e, message) {
            data.text = message.text;
            update();
        },
        color: function(e, message) {
            data.color = message.color;
            update();
        }
    });

    // return the element for further work
    return this.$element;
}

})(jQuery, block);