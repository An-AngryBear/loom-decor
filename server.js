var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.use("/css", express.static(__dirname));
app.use("/imgs", express.static(__dirname + '/imgs'));
app.use("/dist", express.static(__dirname + '/js'));
app.use("/templates", express.static(__dirname + '/templates'));
app.use("/data", express.static(__dirname + '/data'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(process.env.PORT || 3000);

console.log("listening...")