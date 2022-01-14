var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var turtleSchema = new Schema({
    position:{
        x:Number,
        y:Number,
        z:Number
    },
    id:Number,
    name:String,
})
module.exports = mongoose.model("Turtle",turtleSchema)