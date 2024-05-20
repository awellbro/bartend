const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
    drinkName: String,
    ingredients: [],
    instructions: String,
});

module.exports = mongoose.model("Drink", DrinkSchema)