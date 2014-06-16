var fs = require('fs');
var url = require('url');
var sqlite3 = require('sqlite3');

var contentPath = './Content';
var serverUtil = {};
try{
var db = new sqlite3.Database("../BackEnd/MoodMonitor.db", sqlite3.OPEN_READONLY);
}catch(err){
console.log(err);
}

			

exports.standardHeaders = function (type, length, cache){
type = type || "plain";
if(!(length && cache)){
return {
	"Content-Type":type+"; charset=UTF-8"
	};
}
else if(!length){
return {
	"Content-Type":type+"; charset=UTF-8",
	"Content-Length": length
	};
}
else if(!cache){
	return {
	"Content-Type":type+"; charset=UTF-8",
	"Cache-control": "max-age=3600"
	};
}
else {
return {
	"Content-Type":type+"; charset=UTF-8",
	"Content-Length": length,
	"Cache-control": "max-age=3600"
	};
}

};

exports.faviconHandler = function (response){
console.log("Handler Found:	faviconHandler");
var body = fs.readFileSync('./favicon.ico');
	response.writeHead(200, this.standardHeaders("image/x-icon", body.length, 'yes'));
	response.write(body ,'binary');
return;
};

exports.cityHandler = function (response){
console.log("Handler Found:	city");
//var body = fs.readFileSync('./favicon.ico');
	
	
	response.writeHead(200, this.standardHeaders("application/json", body.length, 'yes'));
	response.write(body ,'binary');
return;
};

exports.indexHandler = function(response) {
console.log("Handler Found:  indexHandler");
var body = fs.readFileSync('./index.html', 'utf8');
	response.writeHead(200, this.standardHeaders("text/html", body.length, 'yes'));
	response.write(body);
return;
};

exports.textResourceControler = function(response, type, requestUrl){
console.log("Handler Found:  resourceController  Type:  "+type);
var body = fs.readFileSync('.'+requestUrl, 'utf8');
	response.writeHead(200, this.standardHeaders('text/'+type, body.length, 'yes'));
	response.write(body);
return;
};

exports.imageResourceControler = function(response, type, requestUrl){
console.log("Handler Found:  resourceController  Type:  "+type);
var body = fs.readFileSync('.'+requestUrl);
	response.writeHead(200, this.standardHeaders('image/'+type, body.length, 'yes'));
	response.write(body, 'binary');
return;
};

exports.otherResourceControler = function(response, type, requestUrl){
console.log("Handler Found:  otherResourceController  Type:  "+type);
var body = fs.readFileSync('.'+requestUrl);
	response.writeHead(200, this.standardHeaders(type, body.length, 'yes'));
	response.write(body, 'binary');
return;
}

exports.dataHandler =  function (rawQuery, response){
	console.log("Handler Found:  dataHandler");
	
	
	//sample_tweets
	db.all("SELECT * FROM `location_mood_data` ORDER BY 'location' ASC", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		console.log(jsonresponse.length);
		fs.writeFile("cities.json", jsonresponse, function(){
			//console.log("ooooohhh yeahhhh.");
		});
		
		//window.settimeout
	});
		
	
	return;
};

exports.tweetHandler =  function (rawQuery, response){
	console.log("Handler Found:  tweetHandler");
	
	
	//sample_tweets
	db.all("SELECT * FROM `sample_tweets` WHERE location='boston' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("boston.json", jsonresponse, function(){
		});
	});
	
	db.all("SELECT * FROM `sample_tweets` WHERE location='nyc' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("nyc.json", jsonresponse, function(){
		});
	});
	
	db.all("SELECT * FROM `sample_tweets` WHERE location='dc' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("dc.json", jsonresponse, function(){
		});
	});
	
	db.all("SELECT * FROM `sample_tweets` WHERE location='atlanta' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("atlanta.json", jsonresponse, function(){
		});
	});
	
	db.all("SELECT * FROM `sample_tweets` WHERE location='la' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("la.json", jsonresponse, function(){
		});
	});
	
	db.all("SELECT * FROM `sample_tweets` WHERE location='sf' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("sf.json", jsonresponse, function(){
		});
	});
	
	db.all("SELECT * FROM `sample_tweets` WHERE location='seattle' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("seattle.json", jsonresponse, function(){
		});
	});
	
	db.all("SELECT * FROM `sample_tweets` WHERE location='orlando' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("orlando.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='no' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("no.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='cs' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("cs.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='abq' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("abq.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='dallas' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("dallas.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='sd' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("sd.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='lv' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("lv.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='portland' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("portland.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='vc' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("vc.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='buf' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("buf.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='chi' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("chi.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='mil' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("mil.json", jsonresponse, function(){
		});
	});
	db.all("SELECT * FROM `sample_tweets` WHERE location='min' LIMIT 5", function(err, rows){
		jsonresponse = JSON.stringify(rows);
		fs.writeFile("min.json", jsonresponse, function(){
		});
	});
	
	return;
};

exports.readFileHandler = function(response){
	console.log("Handler Found:  readFileHandler");
	
	var jsonResponse = fs.readFileSync('cities.json');

	
	response.writeHead(200, {"Content-Type":"application/json; charset=UTF-8",
	"Content-Length": jsonResponse.length,
	"Cache-control": "no-cache"
	});
	response.write(jsonResponse);
};

exports.readTweetHandler = function(rawQuery, response){
	console.log("Handler Found:  readTweetHandler");
	console.log(rawQuery);
	var filename = rawQuery+'.json';
	console.log(filename);
	var jsonResponse = fs.readFileSync(rawQuery+'.json');

	
	response.writeHead(200, {"Content-Type":"application/json; charset=UTF-8",
	"Content-Length": jsonResponse.length,
	"Cache-control": "no-cache"
	});
	response.write(jsonResponse);
};





