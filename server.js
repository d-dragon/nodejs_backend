var http = require('http');
var url = require('url');
/*
var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Hello Http');
});
*/

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

/*
        request.setEncoding("utf8");
        
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
        });
        
        request.addListener("end", function() {
            route(handle, pathname, response, postData);
        });
*/

/*
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
*/

//        var content = route(handle, pathname, response);
//        response.write(content);
//        response.end();
        route(handle, pathname, response, request);
    }
    http.createServer(onRequest).listen(8081);
    console.log("Server has started.");
}

exports.start = start;
exports.info = function () {
    console.log("Http server! port 8081")
};

//server.listen(8081);
