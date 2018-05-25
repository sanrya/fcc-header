// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var os = require('os')
app.set('trust proxy', 'loopback');
var useragent = require('express-useragent');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(useragent.express());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  var theHeader = req.headers
  var theObj = {}
  var theIp = req.headers['x-forwarded-for']
  theIp = theIp.split(",")
  theObj.language =  theHeader["accept-language"]
  theObj.ip = theIp[0]
  theObj.software = req.useragent.platform + "; " + req.useragent.os + " " + req.useragent.version
  res.send(theObj) 
  res.end()
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
