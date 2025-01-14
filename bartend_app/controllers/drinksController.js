const Drinks = require('../models/drinks');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

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
    const allDrinks = await Drinks.find({}, 'drinkName').sort({title: 1}).exec();

    res.render('layout', {
        content: 'drink_form',
        title: 'create new drink',
        drink_list: allDrinks,
        errors: '',
        drink: '',
    });
});

exports.drinks_create_post = [
    //valitize
    body('drinkName', 'drink name cannot be blank.')
    .trim()
    .isLength({min: 3})
    .escape(),

    body('ingredients').escape(),

    body('instructions', 'please enter the instructions to create the drink')
    .trim()
    .isLength({min: 3})
    .escape(),

    //process request
    asyncHandler(async (req, res, next) => {
        //extract any errors present from request
        const errors = validationResult(req);

        //create Drink object with cleaned data
        const drink = new Drinks({
            drinkName: req.body.drinkName,
            ingredients: req.body.ingredients.split(' ,').map(item => item.trim()),
            instructions: req.body.instructions,
        });

        if(!errors.isEmpty()){
            // if there are errors
            res.render('layout', {
                content: 'drink_form',
                title: 'create new drink',
                drink: drink,
                errors: errors.array(),
            });
            return
        } else {
            //if no errors
            //check if drink name already exists
            const drinkExists = await Drinks.findOne({drinkName: req.body.drinkName})
            .collation({locale: 'en', strength: 2})
            .exec()

        if(drinkExists){
            //redirect to drink detail page if drink exists
            res.redirect(drinkExists.url);
        } else {
            //if drink does not exist already, save and redirect open page with new drink
            await drink.save();
            res.redirect(drink.url);
        }
    }
    }),
];

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