var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;



var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.

    HINT: explore the request object and its properties
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
   if (parsedUrl.path === '/listings'){

     response.write(JSON.stringify(listingData));

   } else {
     response.statusCode = 404;
     response.write("Bad gateway error")

   }
   response.end();
};
fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
   */
      if (err) throw err

      listingData = JSON.parse(data);  //Sends json data as javascript object


   server = http.createServer(requestHandler);  //Create a new server
   server.listen(port, function() {   //This listens for callbacks to see if the server is connected
     //console.log("Server has started on " + port)
   });
});
