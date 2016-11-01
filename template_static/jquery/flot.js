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
    block('#tweet').tweets({
    memory: 20
    });
    block('#populartweet').tweets({
    memory: 20
    });
    
});
