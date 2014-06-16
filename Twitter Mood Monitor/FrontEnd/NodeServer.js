var http = require("http");
var fs = require("fs");
var url = require('url');
var util = require('./ServerUtil.js');

var lessons = {
			"l1" : "lesson1/",
			"l2" : "lesson2/"
			};
var resourcePaths = {
				"favicon": {"request":"/favicon.ico",
						"handler":"util.faviconHandler(response)"},
				"index":  {"request": "/", "handler":"util.indexHandler(response)"},
				

};


http.createServer(function(request, response){
var rawQuery = request.url.substring(request.url.indexOf('?')+1);
if(rawQuery === request.url){
		var requestUrl = request.url;
} else {
	var requestUrl = request.url.substring(0,request.url.indexOf(rawQuery)-1);
}

console.log("Searching for:  ".concat(requestUrl));
if(requestUrl === "/"){
	util.indexHandler(response);
}
else if(requestUrl === "/map.html"){
	util.textResourceControler(response, 'html', "/map.html");
}
else if(requestUrl === "/index.html"){
	util.textResourceControler(response, 'html', "/index.html");
}
else if(requestUrl === "/data/"){
	util.dataHandler(rawQuery, response);
}
else if(requestUrl === "/tweetData/"){
	util.tweetHandler(rawQuery, response);
}
else if(requestUrl === "/readFile/"){
	util.readFileHandler(response);
}
else if(requestUrl === "/readTweet/"){
	util.readTweetHandler(rawQuery, response);
}
else if(requestUrl === "/cities/"){
	util.cityHandler(rawQuery, response);
}
else if(requestUrl === "/favicon.ico"){
	util.faviconHandler(response);
}
else if(requestUrl.indexOf('/Styles/') != -1){
	util.textResourceControler(response, 'css', requestUrl);
}
else if(requestUrl.indexOf('/js/') != -1){
console.log(request.url);
	util.textResourceControler(response, 'javascript', requestUrl);
}
else if(requestUrl.indexOf('/Fonts/') != -1){
	util.otherResourceControler(response, 'font/ttf', requestUrl);
}

else if(requestUrl.indexOf('/Content/Images/') != -1){
	if(requestUrl.indexOf('.png') != -1){
		util.imageResourceControler(response, 'png', requestUrl);
	}
	else if(requestUrl.indexOf('.jpg') != -1){
		util.imageResourceControler(response, 'jpg', requestUrl);
	}
	else{
		console.log("Unsupported Image format.");
	}
}
else {
	console.log("Unfound path:  ".concat(requestUrl));
}

response.end();


}).listen(8888);