from eca import *
from eca.generators import start_offline_tweets

## You might have to update the root path to point to the correct path
## (by default, it points to <rules>_static)
#root_content_path = 'template_static'


# binds the 'setup' function as the action for the 'init' event
# the action will be called with the context and the event
@event('init')
def setup(ctx, e):
    start_offline_tweets('batatweets.txt', 'chirp', time_factor=100000)
    ctx.count = 0
    fire('timer')
tweet_count = 0
@event('timer')
#loop that updates the rolling chart and gauge every second
def checktime(ctx, e):
    global tweet_count
    #Workaround for if no tweets have been counted:
    if tweet_count == 0:
        tweet_count=0.01
    emit('tweetcount',{'action': 'add', 'value': tweet_count})
    #Reset tweet count for next iteration
    tweet_count=0
    fire('timer', delay=1)
#For every tweet add the hashtags to the wordcloud with value 1
def updateWordCloud(tweetdata):
    hashtags = tweetdata['entities']['hashtags']
    for i in range(len(hashtags)):
        emit('word', {'action': 'add', 'value': [hashtags[i]["text"], 1]})
#For every tweet send, if coordinates exist, coordinates and tweet text to tweetmap
def updateMap(tweetdata):
    if tweetdata['coordinates'] != None:
        emit('map', {'action': 'add', 'values': [tweetdata['coordinates']['coordinates'], tweetdata["text"]]})
#Emit tweet if user matches @batavierenrace
def updateOfficialTweet(tweetdata):
    if tweetdata['user']['id_str'] == "19373068":
        emit('officialtweet', tweetdata)
#tweet event
@event('chirp')
def tweet(ctx, e):
    global tweet_count
    tweet_count = tweet_count + 1
    #Retrieve tweet data from e
    tweetdata = e.data
    #Call update functions for wordcloud, map, official tweetfeed
    updateWordCloud(tweetdata)
    updateMap(tweetdata)
    updateOfficialTweet(tweetdata)
    #update live tweet feed
    emit('tweet', tweetdata)
