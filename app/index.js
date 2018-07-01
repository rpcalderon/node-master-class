/*
* Primary file for the API
*
*/


// dependencies
var http = require('http');
var url = require('url');

// The server should respond to all request with a string
var server = http.createServer(function(req, res) {

  // Get the URL and parse it
  var parseUrl = url.parse(req.url,true);

  // Get the path
  var path = parseUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'')

  // Send the reponse
  res.end('Hello World\n');

  // Log the request path
  console.log(' Request receive on path: '+trimmedPath);
});

// start the server, and have it listen on port 3000
server.listen(3000,function(){
  console.log('The server is listening on port 3000 now');
});