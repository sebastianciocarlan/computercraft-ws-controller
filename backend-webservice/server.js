"use strict";

const serverPort = 3000,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
    //send feedback to the incoming connection
    webSocketClient.send('{ "connection" : "ok"}');

    //when a message is received
    webSocketClient.on('message', (message) => {
        //for each websocket client
        webSocketClient.send("You just sent " + message)
    });
});

//start the web server
server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});