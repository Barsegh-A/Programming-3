var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("<h1>Hello world</h1>");
});
app.get("/name/:name", function (req, res) {
    var name = req.params.name;
    res.send("<h1>Hello " + name + "</h1>");
});
app.get("/google", function (req, res) {
    res.redirect("http://google.com");
});
app.get("/google/:search", function (req, res) {
    var search = req.params.search;
    res.redirect("http://google.com/search?q=" + search);
});
app.get("/*", function (req, res) {
    res.send("<h1>Error 404 Not Found</h1>");
});
app.listen(3000, function () {
    console.log("Example is running on port 3000");
});
