var express = require('express');
var app = express();

app.use(express.static('src'));

app.get('*', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

app.get('/parse_and_save', function (req, res) {
   res.end('Paes and Save.');
})


var server = app.listen(9001, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("This app listening at http://%s:%s", host, port)
})