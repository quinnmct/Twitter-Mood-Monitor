import credentials
import oauth2 as oauth
import json
import  pprint
import re
pp = pprint.PrettyPrinter(indent=4)

class TweetManipulator:

#
#constructor
#
	def __init__(self,geoString):
		self.__reinit__(geoString)
		consumer = oauth.Consumer(key=credentials.CONSUMER_KEY, secret=credentials.CONSUMER_SECRET)
		token = oauth.Token(key=credentials.ACCESS_TOKEN, secret=credentials.ACCESS_TOKEN_SECRET)
		
		self.client = oauth.Client(consumer, token)
		
		self.HappyRegex = re.compile("(?:\s|^)[;:=B8X]{1}[-]?[)}\]*DP]{1}(?:\s|\Z)|(?:\s|^)[(c{[*]{1}[-]?[;:=B8X]{1}(?:\s|$)", re.IGNORECASE)
		self.UnhappyRegex = re.compile("(?:\s|^)[:=;]{1}[,-_]{0,2}[([{/s\\o|]{1}(?:\s|\Z)|(?:\s|^)[})\]/s\\oD]{1}[,-_]{0,2}[:=;]{1}(?:\s|\Z)", re.IGNORECASE)
		
#clean variables for object reuse
#In:		geolocation as a string
#Out:	None
	def __reinit__(self, geoString = None):
		assert geoString is not None
		self.tweetDataList = []
		self.searchURL = 'https://api.twitter.com/1.1/search/tweets.json?q=""&geocode="'+geoString+'"&count=1000&result_type=recent'

#performing the search
#In:		None
#Out:	None
	def gatherTweetData(self):
		response, searchResults = self.client.request(self.searchURL, method="GET")
		jsonData = json.loads(searchResults)
		if "statuses" in jsonData.keys():
			for status in jsonData["statuses"]:
				tweetText = status["text"]
				self.tweetDataList.append(
					(status["id"], tweetText, self.parseMoodData(tweetText))
				)
	
#Use regex to determine mood data
#In:		textString
#Out:	(happyCount, unhappyCount)
	def parseMoodData(self, textString):
		#print textString
		y = re.findall(self.HappyRegex,textString)
		z = re.findall(self.UnhappyRegex,textString)
		x =  (len(y),
						len(z) )
		#if(x[0]+x[1]) != 0:
		#	self.printMoodData(y, z, textString)
			
		return x
		
		
	def printMoodData(self, hap, unhap, text):
		print "Tweet***************************************"
		print repr(text)
		print "\n"+str(hap)+"\t"+str(unhap)
		print "********************************************"
		
		
# For testing
	def testerPrint(self, hap, unhap, text):
		print "Tweet***************************************"
		
		for i in hap:
			if i != []:
				print i
				print "\n"
				
		for i in unhap:
			if i != []:
				print i
				print "\n"
		
		print repr(text)
		print "\n"+str(len(hap))+"\t"+str(len(unhap))
		print "********************************************"
		
