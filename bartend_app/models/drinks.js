const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
    drinkName: { type: String, required: true},
    ingredients: {type: [String], required: true},
    instructions: {type: String, required: true},
});

module.exports = mongoose.model("Drink", DrinkSchema)