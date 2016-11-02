from eca import *
from eca.generators import start_offline_tweets
import textwrap
import json
from time import time
import string

#Setting up the tweets and starting the timer
@event('init')
def setup(ctx, e):
    start_offline_tweets('batatweets.txt', 'chirp', time_factor=100000)
    ctx.count = 0
    fire('timer')
#Setting intitial tweet_count value
tweet_count = 0
#Timer event that gets called every second
@event('timer')
#Update the rollingchart
def checktime(ctx, e):
    global tweet_count
    #Workaround for if no tweets have been counted:
    if tweet_count == 0:
        tweet_count=0.01
    #Emit the number of tweets counted in one second
    emit('tweetcount',{'action': 'add', 'value': tweet_count})
    #Reset the counter
    tweet_count=0
    fire('timer', delay=1)
#Update the wordcloud
def updateWordCloud(tweetdata):
    #Get the hashtags from the tweet
    hashtags = tweetdata['entities']['hashtags']
    #For every hashtag, we send a word event that adds 1 to the corresponding hashtag in the wordcloud
    #or create a new entry if the word is not yet in the wordcloud
    for i in range(len(hashtags)):
        emit('word', {'action': 'add', 'value': [hashtags[i]["text"], 1]})
#Update the map
def updateMap(tweetdata):
    #Check if tweet has coordinates and if it has coordinates, emit event map which contains those cooridnates
    if tweetdata['coordinates'] != None:
        emit('map', {'action': 'add', 'value': tweetdata['coordinates']['coordinates']})
#tweet event
@event('chirp')
def tweet(ctx, e):
    #Increase the tweet counter
    global tweet_count
    tweet_count = tweet_count + 1
    #Get the tweetdata and update the blocks.
    tweetdata = e.data
    updateWordCloud(tweetdata)
    updateMap(tweetdata)
    #Send tweet event with tweetdata for the live tweet feed.
    emit('tweet', tweetdata)
