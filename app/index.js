/*
* Primary file for the API
*
*/


// dependencies
var http = require('http');

// The server should respond to all request with a string
var server = http.createServer(function(req, res) {
  res.end('Hello World\n');
});

// start the server, and have it listen on port 3000
server.listen(3000,function(){
  console.log('The server is listening on port 3000 now');
});