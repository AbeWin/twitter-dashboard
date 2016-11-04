(function($, block) {

block.fn.gauge = function(config) {
    // handle configuration (no configuration needed for our purpose)
    var options = $.extend({
    }, config);
    //Feed tweetcount data to gauge
    this.actions({
        add: function(e, message) {
            val = message.value
            gauge.refresh(val)
            }
    });
    return this.$element;
    }
})(jQuery, block);
