module.exports = class TurtleController {
    static Turtle = require('../models/turtle');;
    //create a new Turtle and save it  
    static createTurtle(position, id, name) {
            var turtle = new this.Turtle({ position: position, id: id, name: name });
            turtle.save()
        }
        //find all turtles
    static listTurtles = () => {
        return this.Turtle.find();
    };
    //find turtle by id  
    static findTurtle = (id) => {
        return this.Turtle.findOne({ id: id })
    };
    //delete all turtles
    static deleteAllTurtles = () => {
            return this.Turtle.deleteMany({});
        }
        //edit position turtle
    static moveTurtle = async(id, x, y, z) => {
            this.Turtle.updateOne({ id: id }, { position: { x: x, y: y, z: z } })
        }
        //Rename turtle bn n
    static renameTurtle = async(id, name) => {
        this.Turtle.updateOne({ id: id }, { name: name })
    }
}