var url = require('url');
var request = require('request');
var express = require('express');

  // var express = require("express");
  var app = express();

options = {
  protocol: "https:",
  host: "api.twitter.com",
  pathname: '1.1/search/tweets.json',
  query: { q: "codeschool"}
};

var searchURL = url.format(options);

app.get('/', function(req,response){
  request(searchURL).pipe(response);
});

app.listen(8080);