const Drink = require('../models/drinks');
const Ingredient = require('../models/ingredients');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

// TODO: display all ingredients? (v.2)

// TODO: display details for each ingredient (v.1)
exports.ingredient_detail = asyncHandler(async(req, res, next) => {
    const ingredient = Ingredient.findById(req.params.id).exec();

    if (ingredient === null) {
        const err = new Error('Ingredient not found');
        err.status = 404;
        return next(err);
    }
    
    res.render('layout', {
        content: 'ingredient_detail',
        title: ingredient.name,
        ingredient: ingredient,
    });
})