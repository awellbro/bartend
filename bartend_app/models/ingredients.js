const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientsSchema = new Schema({
    name: {type: String, required: true, trim: true}
});

IngredientsSchema.virtual('url').get(function(){
    return `catalog/ingredient/${this._id}`
});

module.exports = mongoose.model('Ingredients', IngredientsSchema);
