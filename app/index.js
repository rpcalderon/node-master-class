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

    // Choose the chandler this request should go to. If one is not found use the notFound handler
    var chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Contruct the data object to send tot he handler
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    // Route the request to the handler specified in the router
    chooseHandler(data,function(statusCode,payload) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.writeHeader(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log('Returning this response: ', statusCode,payloadString);
    });

    // Send the reponse
    //res.end('Hello World\n');

    // Log the request path
    //console.log('Request received with theis payload: ', buffer);
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

// define the handlers
var handlers = {};

// Sample Handler
handlers.sample = function(data,callback) {
  // Callback a HTTP status code, and a payload object
  callback(406,{'name': 'same handler'});
};

// Not found handler
handlers.notFound = function(data,callback) {
  callback(404);
};

// Define a request router
var router = {
  'sample': handlers.sample
};