const Drinks = require('../models/drinks');
const Ingredients = require('../models/ingredients');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

// TODO: display all ingredients? (v.2)
exports.ingredients = asyncHandler(async(req, res, next) => {
    const allIngreds = await Ingredients.find({})
        .populate('name')
        .exec();

    res.render('layout', {
        content: 'ingredients',
        title: "Ingredients",
        ingredients_list: allIngreds,
    });
});

// TODO: display details for each ingredient (v.1)
exports.ingredient_detail = asyncHandler(async(req, res, next) => {
    //const ingredient = Ingredients.findById(req.params.id).exec();
    const [drinks, ingredients] = await Promise.all([
        Drinks.find({}).populate('ingredients').exec(),
        //Ingredients.find({}).populate('drinks').exec(),
        Ingredients.findById(req.params.id).exec(),

    //Drinks.findById(req.params.id).exec(),
    //Drinks.find({ingredients: req.params.id}).populate('ingredients').exec(),
    ]);
    if (ingredients === null) {
        const err = new Error('Ingredient not found');
        err.status = 404;
        return next(err);
    }
    
    res.render('layout', {
        content: 'ingredient_detail',
        title: ingredients.name,
        ingredient: ingredients,
        params: req.params.id,
        drinks: drinks,
    });

});

exports.ingredient_delete_get = asyncHandler(async(req, res, next) => {
    const [ingredient, drinksInGredient] = await Promise.all([
        Ingredients.findById(req.params.id).exec(),
        Drinks.find({ingredients: req.params.id}).populate('drinkName').exec(),
    ]);

    if(ingredient){
        res.render('layout', {
            content: 'ingredient_delete',
            title: 'Delete Ingredient',
            ingredient: ingredient,
            ingredient_drinks: drinksInGredient,
        });
    };
});

exports.ingredient_delete_post = asyncHandler(async(req, res, next) => {
    const [ingredient, drinksInGredient] = await Promise.all([
        Ingredients.findById(req.params.id).exec(),
        Drinks.find({ingredients: req.params.id}).populate('drinkName').exec(),
    ]);

    if(drinksInGredient.length > 0){
        res.render('layout', {
            content: 'ingredient_delete',
            title: 'Delete Ingredient',
            ingredient: ingredient,
            ingredient_drinks: drinksInGredient,
        });
    } else {
        Ingredients.findByIdAndDelete(req.body.ingredid).exec();
        res.redirect('/catalog/ingredients');
    }
});