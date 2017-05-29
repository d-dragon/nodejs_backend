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
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");


/*
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
*/

        var content = route(handle, pathname, response);
//        response.write(content);
//        response.end();
    }
    http.createServer(onRequest).listen(8081);
    console.log("Server has started.");
}

exports.start = start;
exports.info = function () {
    console.log("Http server! port 8081")
};

//server.listen(8081);
