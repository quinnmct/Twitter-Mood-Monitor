-------------------------------------------------------------------------------
Twitter Mood Monitor
-------------------------------------------------------------------------------
Version 1.000
Release date: TBA
-------------------------------------------------------------------------------
Project state:
beta | student project
-------------------------------------------------------------------------------
Credits
	Ricky Madden
	Quinn McTiernan
-------------------------------------------------------------------------------
Project description

The Twitter Mood Monitor is a web application designed to visualize the Twitter 
community’s mood on a map. The mood data is calculated using live emoticon data 
read from Tweets. The web application will be a single page application running 
on a Node.js server and the database is build upon Python 2.7.3.

-------------------------------------------------------------------------------
Dependencies:

 - Python 2.7.3
https://www.python.org/download/releases/2.7.3

 - Python setuptools
/Twitter Mood Monitor/ez_setup.py

 - Httplib2 
https://github.com/jcgregorio/httplib2

 - Python Oauth2
https://github.com/brosner/python-oauth2

 - Node.js
http://nodejs.org/download/

 - Node.js sqlite3
https://github.com/mapbox/node-sqlite3


-------------------------------------------------------------------------------
Installation instructions

There are many dependencies associated with the Twitter Mood Monitor system. 
You will need to download all dependencies in the correct order.

Where to put the Project
   -Ensure the project is located in your C:\ folder.
   -Otherwise you will break several absolute paths

Running the Database:

   -Download & Install Python 2.7.3:
	-https://www.python.org/download/releases/2.7.3
	-make sure 'python' has been added to your path variables

   -Download & install python setuptools:
	-Navigate to C:\Twitter Mood Monitor directory
	-Shift-rightClick and select 'Open command window here' (or open a command prompt and navigate to here)
	-in the command prompt, type 'python ez_setup.py'

   -Download Httplib2 
	-download repository here: https://github.com/jcgregorio/httplib2
	-navigate to 'httplib2-master'
	-Open command window here
	-type `python setup.py build`
	-upon success, type 'python setup.py install' 

   -Download Python Oauth2
	-download repository here: https://github.com/brosner/python-oauth2
	-navigate to 'python-oauth2-master'
	-Open command window here
	-type `python setup.py build`
	-upon success, type 'python setup.py install' 

   -Run the Database
	-navigate to c:\Twitter Mood Monitor\BackEnd
	-Open command window here
	-type `python TweetParsingEngine.py'
	-the database should begin populating and you should begin 
	 to see tweet data print to the console


Running the Web Application:

   -download Node.js
	-http://nodejs.org/download/
	-make sure node & npm are added to your path variables

   -download & install sqlite3 for Node.js
	-navigate to 'Twitter Mood Application'
	-open a command window here
	-type 'npm install sqlite3'

   -run the Node.js server
	-navigate to C:\Twitter Mood Monitor\FrontEnd
	-open a command window here
	-type 'node NodeServer.js'
	
   -Navigate to the web application
	-open a web browser
	-navigate to page 'localhost:8888'


-------------------------------------------------------------------------------
Additional Notes

This application will only work in a windows environment.

Ocassionally the browser will seem to hang up and you may need to hit enter with your focus on
the command prompt which is running 'node NodeServer.js'

If the map page seems to be unresponsive there may have been a caching issue and you should
clear the cache and then reload the page

Not all of the locations are seen when you navigate to a region! Feel free to pan around!



