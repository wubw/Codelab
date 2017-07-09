var path = require('path');

var port = 5000;
var url = "http://localhost:" + port;

var express = require('express');
var app = express();

var static = express.static(path.join(__dirname, 'app'));
app.use(static);

app.get("/oidc-client.js", function(req, res){
    res.sendFile(path.join(__dirname, './dist/oidc-client.js'));
});

var oidc = require('./oidc.js');
oidc(url, app);

console.log("listening on " + url);
app.listen(port);

