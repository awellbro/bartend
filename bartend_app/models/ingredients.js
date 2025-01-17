const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientsSchema = new Schema({
    name: {type: String, required: true, trim: true}
});

module.exports = mongoose.model('Ingredients', IngredientsSchema);
