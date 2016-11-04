$(document).ready(function(){
    //Initialise tweetometer gauge
    initGauge();
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
        //Applying logarithmic filter to delete rarely used hashtags
        filter_function: function(cat, val, max) {
            return Math.pow(val, (1/Math.log10(max))) > 1.8
            },
        //Calculating logarithmic weightfactor from 1 to 10
        weight_function: function(cat, val, max) {
            return Math.round(Math.pow(val, (1/Math.log10(max))))
        }
    });
    block('#tweet').tweets({
    memory: 5
    });
    block('#officialtweet').tweets({
    memory: 3
    });
    block('#map').map({});
    block('#gauge').gauge({});
});
//Initialise maP (done by google) with correct zoom and center
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {zoom: 9, center: {lat: 51.99780, lng: 6.44820}, mapTypeId: 'roadmap'});
}
//initialise tweetometer gauge with correct scale
var gauge;
function initGauge() {
    var max = 80;
    gauge = new JustGage({
        id: 'gauge',
        value: 0,
        min: 0,
        max: max,
        pointer: true,
        gaugeWidthScale: 1,
        customSectors: [{
            color: '#ff0000',
            lo: 0.75*max,
            hi: max
        },{
            color: '#f4b342',
            lo: 0.5*max,
            hi: 0.75*max
        }, {
            color: '#00ff00',
            lo: 0,
            hi: 0.5*max
        }],
        counter: true
        });
    };

//functions for our sliding nav:
function openNav() {
    document.getElementById("Sidenav").style.width = "350px";
}

function closeNav() {
    document.getElementById("Sidenav").style.width = "0";
}
