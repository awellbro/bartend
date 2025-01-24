const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientsSchema = new Schema({
    name: {type: String, required: true, trim: true},
    // recommendations are to only have one reference to another collection in ONE of the models, not both
    drinks: {type: Schema.Types.ObjectId, ref: 'Drinks'}, //reference to associated drink
});

IngredientsSchema.virtual('url').get(function(){
    return `/catalog/ingredient/${this._id}`
});

module.exports = mongoose.model('Ingredients', IngredientsSchema);
