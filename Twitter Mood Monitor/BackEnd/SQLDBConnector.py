import sqlite3
import re
class SQLDBConnector:

# Constructor
#
	def __init__(self):
		self.db = self.__openDB__() #default db name
		cursor = self.db.cursor()
		
		cursor.execute("CREATE TABLE IF NOT EXISTS location_mood_data(location TEXT PRIMARY KEY, total_parsed INTEGER,num_happy INTEGER, num_unhappy INTEGER)")
		cursor.execute("CREATE TABLE IF NOT EXISTS sample_tweets(tweet_id INTEGER PRIMARY KEY, location TEXT, text TEXT,num_happy INTEGER, num_unhappy INTEGER)")
		self.db.commit()
		cursor.close()
	
# Creates a transactional query on the DB
#In:		sql syntax and optional parameters
#Out:	List of results
	def __queryDB__(self, syntax, tupleParam=None):
		cur = self.db.cursor()
		if tupleParam is None:
			cur.execute(syntax)
		else:
			cur.execute(syntax, tupleParam)
		results = cur.fetchall()
		cur.close()
		self.db.commit()
		
		return results

# Safely open a DB connection
#In:		None
#Out:	sqlite.Connection Object
	def __openDB__(self):
		return sqlite3.connect("MoodMonitor.db")

		
# Safely close the db connection
#In:		None
#Out:	None
	def __closeDB__(self):
		self.db.close() 
	
# builds insert all syntax and executes it against the db
#In:		tablename and list od data tuples
#Out:	boolean value based on success
	def insertAll(self, tableName, dataList):
	# determine the boilerplate syntax
		if tableName == "location_mood_data":
			sqliteInsertAllSyntax = "INSERT OR REPLACE INTO `"+tableName+"` ('location', 'total_parsed', 'num_happy', 'num_unhappy') VALUES "
		elif tableName == "sample_tweets":
			sqliteInsertAllSyntax = "INSERT OR IGNORE INTO `"+tableName+"` ('tweet_id', 'location', 'text', 'num_happy', 'num_unhappy') VALUES "
		else:
			assert True is False #trigger an error if it's a bad tableName
		
	# build the records to be inserted based on the types of values
		valuesSyntax = ""
		parameterValuesList = []
		for dataTuple in dataList:
			valuesSyntax +="("
			for field in dataTuple:
				if type(field) is str:
					valuesSyntax += "?,"#took out single quotes... maybe params takes care of it
					parameterValuesList.append(field)
				elif type(field) is tuple:
					valuesSyntax += "?,?,"
					parameterValuesList.append(field[0])
					parameterValuesList.append(field[1])
				else:
					valuesSyntax += "?,"
					parameterValuesList.append(field)
			valuesSyntax = valuesSyntax[:-1]+")," #eliminate last comma and close the parens
		
		#return sqliteInsertAllSyntax+valuesSyntax[:-1]+";"	#used in testing
		results = self.__queryDB__(sqliteInsertAllSyntax+valuesSyntax[:-1]+";", tuple(parameterValuesList)) #eliminate the last comma and close query with ;
		#parse results to determine the return type
		return results

			
			