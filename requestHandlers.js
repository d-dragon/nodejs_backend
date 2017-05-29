function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    //    sleep(10000);

    /*
        exec("ls -lah", function (error, stdout, stderr) {
            response.writeHead(200, {
                "Content-Type": "text/plain"
            });
            response.write(stdout);
            response.end();
        });
    */
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' + 'method="post">' +
        //    '<textarea name="text" rows="20" cols="60"></textarea>'+
        //    '<input type="submit" value="Submit text" />'+
        '<input type="file" name="upload"> ' +
        '<input type="submit" value="Upload file"/>' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request hadler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");

    form.parse(request, function (error, fields, files) {
        console.log("parsing done.");
        if (error !== null) {
            console.log("Parsing form failed!");
            response.writeHead(400, {
                "Content-Type": "text/plain"
            });
            //    response.write("Post data: " + querystring.parse(postData).text);
            response.write("Upload form is invalid");
            response.end();
            return;
        }
        console.log("uploaded file path: " + files.upload.path);
        fs.rename(files.upload.path, "/tmp/test.png", function (error) {
            if (error) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        //    response.write("Post data: " + querystring.parse(postData).text);
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });

}

function show(response, request) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {
        "Content-Type": "image/png"
    });
    fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
