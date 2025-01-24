const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
    drinkName: { type: String, required: true},
    // ObjectId is used to reference an object from another collection by using it's unique _id.
    // use .populate() to reference specific data from the referenced object - find Id, then populate the 'name' to get the drink name
    ingredients: {type: [Schema.Types.ObjectId], ref: "Ingredients", required: true},
    instructions: {type: String, required: true},
});

DrinkSchema.virtual("url").get(function(){
    return `/catalog/drink/${this._id}`
});

module.exports = mongoose.model("Drinks", DrinkSchema)