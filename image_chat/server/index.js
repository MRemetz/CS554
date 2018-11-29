const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/index.html');
  });

io.on('connection', function (socket) {
    //console.log('a user connected');
    socket.on('chat message', function(msg) {
        try {
            let response = await nrpSender.sendMessage({
                redis: redisConnection,
                eventName: "GET",
                data: msg
            });
    
        } catch (e) {
            res.json({
                error: e.error
            });
        }
        //io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});