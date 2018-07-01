/*
* Primary file for the API
*
*/


// dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all request with a string
var server = http.createServer(function(req, res) {

  // Get the URL and parse it
  var parseUrl = url.parse(req.url,true);

  // Get the path
  var path = parseUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Get the query string as an object
  var queryStringObject = parseUrl.query;

  // Get the HTTP Method
  var method = req.method.toLowerCase();

  // Get the headers as an object
  var headers = req.headers;

  // Get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data',function(data){
    buffer += decoder.write(data);
  });
  req.on('end',function(){
    buffer += decoder.end();

    // Send the reponse
    res.end('Hello World\n');

    // Log the request path
    console.log('Request received with theis payload: ', buffer);
  });

  // Send the reponse
  //res.end('Hello World\n');

  // Log the request path
  //console.log(' Request receive on path: '+trimmedPath+' with method: '+method+' and with these query string paramenters', queryStringObject);
  //console.log('Request received with these headers: ', headers);
});

// start the server, and have it listen on port 3000
server.listen(3000,function(){
  console.log('The server is listening on port 3000 now');
});