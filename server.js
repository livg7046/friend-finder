var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
var PORT = process.env.PORT || 8080;

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});
