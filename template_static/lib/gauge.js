(function($, block) {

block.fn.gauge = function(config) {
    // handle configuration (no configuration needed for our purpose)
    var options = $.extend({
    }, config);
    // register action add to add a marker
    this.actions({
        add: function(e, message) {
            val = message.value
            gauge.refresh(val)
            }
    });
    return this.$element;
    }
})(jQuery, block);