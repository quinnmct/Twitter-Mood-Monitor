from TweetManipulator import TweetManipulator
from SQLDBConnector import SQLDBConnector
import time
import sys

DBC = SQLDBConnector()
TM = TweetManipulator("TOBECHANGED")
radius = "15mi" #search radius
Locations = {
	"boston" : "42.3581,-71.0636", #Boston
	"nyc" : "40.700,-74.00",
	"dc" : "38.890365,-77.036133",
	"atlanta" : "33.739758,-84.396973",
	"la" : "34.013396,-118.212891",
	"sf" : "37.77872,-122.426147",
	"seattle" : "47.598177,-122.327271",
	"no" : "29.943928,-90.065918",
	"cs" : "38.819916,-104.831543",
	"abq" : "35.109518,-106.611328",
	"dallas" : "32.765914,-96.833496",
	"sd" : "32.714998,-117.15065",
	"lv" : "36.171971,-115.136719",
	"portland" : "45.534732,-122.651367",
	"vc" : "49.267244,-123.123779",
	"buf" : "42.921738,-78.859863",
	"chi" : "41.868283,-87.659912",
	"mil" : "43.048193,-87.912598",
	"min" : "44.994669,-93.284912"
}

#main logic loop
def main():

	for location in Locations:
		TM.__reinit__(Locations[location]+","+radius)
		TM.gatherTweetData()
		
		LocationMoodDataList = None
		SampleTweet = None
		totalHappy = totalUnhappy =0
		
		for tweetData in TM.tweetDataList:
			numEmoticonsInTweet = tweetData[2][0] + tweetData[2][1]
			
			if numEmoticonsInTweet != 0:	# we only care about tweets with emoticons
				totalHappy += tweetData[2][0]
				totalUnhappy += tweetData[2][1]
				
				
				if SampleTweet is None:	#just take the first tweet as a sample for the area
					SampleTweet = (tweetData[0], location,  tweetData[1], tweetData[2][0], tweetData[2][1])
		
		currentNumHappy = currentNumUnhappy = 0
		currentLocationMoodData = DBC.__queryDB__("SELECT num_happy, num_unhappy FROM `location_mood_data` WHERE location='"+location+"'")
		if currentLocationMoodData != []:
			currentNumHappy, currentNumUnhappy = currentLocationMoodData[0]
			
		
		if SampleTweet is not None:
			DBC.insertAll('sample_tweets', [SampleTweet])
		
		DBC.insertAll('location_mood_data', [(
			location,
			totalHappy+currentNumHappy+totalUnhappy+currentNumUnhappy,
			totalHappy+currentNumHappy,
			totalUnhappy+currentNumUnhappy
		)])
	time.sleep(10)

# safely close the DB connection upon exit
try:
	while True:
		main()
except (KeyboardInterrupt):
	DBC.__closeDB__()
	sys.exit()
except :
	print "an error has occured"
	DBC.__closeDB__()
	#sys.exit()
	DBC.__init__()
	main()