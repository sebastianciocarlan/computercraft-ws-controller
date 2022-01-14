"use strict";

const serverPort = 3000,
    dotenv = require('dotenv').config(),
    http = require("http"),
    express = require("express"),
    mongoose = require('mongoose'),
    app = express(),
    WebSocket = require("ws"),
    nameGenerator = require("fantasy-name-generator"),
    db = require("./db/db_controller");

const server = http.createServer(app),
    websocketServer = new WebSocket.Server({ server });

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
    //send feedback to the incoming connection
    console.log("Client connected")
        //when a message is received
    webSocketClient.on('message', (message) => {
        //for each websocket 
        //payload turtle : {"reason":"connection","type":"turtle", "position":{"x":'..x..',"y":'..y..',"z":'..z..'},"id":'..computerID..',"name":"'..computerName..'"}
        let payload = JSON.parse(message.toString("utf-8"))
        if (payload.type == 'turtle') {
            if (db.findTurtle(payload.id)) {
                console.log("Turtle already exists on the database. Updating")
            } else {
                console.log("Adding turtle to the database...")
            }
        }
    });
});
//start the web server
server.listen(serverPort, async() => {
    console.log(`Websocket server started on port ` + serverPort);
    console.log("Connecting to database...")
    try {
        let response = await mongoose.connect(process.env.DB_CONNECTION)
        if (response) {
            console.log("Connection successfull.")
        }
    } catch (e) {
        console.log("Error trying to connect to database: " + e)
    }
});