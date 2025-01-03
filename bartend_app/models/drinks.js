const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
    drinkName: { type: String, required: true},
    ingredients: {type: [String], required: true},
    instructions: {type: String, required: true},
});

DrinkSchema.virtual("url").get(function(){
    return `/catalog/drink/${this._id}`
});

module.exports = mongoose.model("Drinks", DrinkSchema)