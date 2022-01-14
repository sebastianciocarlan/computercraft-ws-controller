"use strict";

const serverPort = 3000,
    dotenv = require('dotenv').config(),
    http = require("http"),
    express = require("express"),
    mongoose = require('mongoose'),
    app = express(),
    WebSocket = require("ws"),
    nameGenerator = require("fantasy-name-generator");

const server = http.createServer(app),
    websocketServer = new WebSocket.Server({ server });

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
var dbControlller = require('./db/db_controller');
const execTest = async () => {
    console.log(await dbControlller.listTurtles())
}
//start the web server
server.listen(serverPort, async () => {
    console.log(`Websocket server started on port ` + serverPort);
    console.log("Connecting to database...")
    try {
        let response = await mongoose.connect(process.env.DB_CONNECTION)
        if (response) {
            console.log("Connection successfull.")
            try { execTest() } catch (e) { console.log("Test error: ", e) }
        }
    } catch (e) {
        console.log("Error trying to connect to database: " + e)
    }
});