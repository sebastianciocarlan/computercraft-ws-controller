"use strict";

const serverPort = 3000,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({ server }),
    nameGenerator = require("fantasy-name-generator");

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
    //send feedback to the incoming connection
    console.log("Client connected")
    webSocketClient.send('print("españa")');

    //when a message is received
    webSocketClient.on('message', (message) => {
        //for each websocket client
        try {
            let payload = JSON.parse(message.toString("utf-8"))

            if (payload.name == "nil") {
                console.log("Turtle has no name. Generating...")
                console.log("Turtle with id " + payload.id + " has now name: " + nameGenerator.nameByRace("dragon", { gender: "male" }))
            }
        } catch (e) {
            console.log(e)
        }
        webSocketClient.send("You just sent " + message)
    });
});

//start the web server
server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});