const Drinks = require('../models/drinks');

const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    const numDrinks = await (Drinks.countDocuments({}).exec())

    res.render("layout", {
        content: 'index',
        title: 'brtndr',
        drink_count: numDrinks,
    });
});

exports.drinks_list = asyncHandler(async (req, res, next) => {
    const allDrinks = await Drinks.find({})
        .populate("drinkName")
        .exec();

    res.render("layout", {content: 'drinks_list', title: 'Drink List', drinks_list: allDrinks});
});

exports.drinks_detail = asyncHandler(async (req, res, next) => {
   const [drink, ingredArr] = await Promise.all([
    Drinks.findById(req.params.id).exec(),
    Drinks.findById(req.params.id).select('ingredients').exec(),
    ]);
    // if ingredArr exists, access ingredients value. else return empty array.
    const ingred = ingredArr?.ingredients || [];
    const formattedIngred = ingred.join(' | ');

   res.render('layout', {
    content: 'drinkDetails',
    title: drink.drinkName,
    drink: drink,
    ingred: formattedIngred,
   });
});

exports.drinks_create_get = asyncHandler(async (req, res, next) => {
    res.send('Not Here: drink create GET');
});

exports.drinks_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drink create POST');
});

exports.drinks_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks delete GET');
});

exports.drinks_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks delete POST');
});

exports.drinks_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks update GET');
});

exports.drinks_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks update POST')
})