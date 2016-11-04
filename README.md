Twitter Dashboard
=================
A twitter dashboard to analyse twitter behaviour during and concerning the Batavierenrace.

Installation instruction
------------------------
  (Make sure you have Python3 installed)
###**Windows**###
  1. Run _run.bat_
  
###**Others**###
  1. Open a terminal and run: `py neca.py -s template.py`
  2. Open a webbrowser and go to: _localhost:8080_
   
File definitions
----------------
  * _template.py_ : Handles the tweets, takes out the relevant data and send it as events to the browser
  * _batatweets.txt_ : Batavierenrace 2013 dataset
  * _template_static/index.html_ : Static html file which defines the layout of the dashboard
  * _template_static/css/style.css_ : General stylesheet
  * _template_static/lib/map.js_ : Defines our own custom map block
  * _template_static/lib/gauge.js_ : Defines our own custom gauge block
  * _template_static/style/wordcloud.css_* : Defines the css for the wordcloud.css
  * _template_static/jquery/flot.js_ : Initializes all the blocks

Used Libraries
--------------
  * Bootstrap
  * ECA
  * jQuery
  * JustGage
  * Google Maps api
  * Raphael
