const Drinks = require('../models/drinks');
const Ingredients = require('../models/ingredients');
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

// TODO: we need to cycle through each ingredient listed within the Drink detail page and
// reference the Ingredient.url to get to detail page.
exports.drinks_detail = asyncHandler(async (req, res, next) => {
   const [drink, drinkIngred] = await Promise.all([
    Drinks.findById(req.params.id).populate('ingredients').exec(),
    Ingredients.find({drinks: req.params.id}).exec(),
    ]);

    // // if ingredArr exists, access ingredients value. else return empty array.
    // const ingred = drinkIngred?.ingredients || [];
    // const formattedIngred = ingred.join(' | ');

   res.render('layout', {
    content: 'drinkDetails',
    title: drink.drinkName,
    drinks: drink,
    // works:
    drinkIngred: drink.ingredients,
    // does not work
    //drinkIngred: drinkIngred,
    
   },
);
});

exports.drinks_create_get = asyncHandler(async (req, res, next) => {
    const allDrinks = await Drinks.find({}, 'drinkName').sort({title: 1}).exec();

    res.render('layout', {
        content: 'drink_form',
        title: 'create new drink',
        drink_list: allDrinks,
        errors: '',
        drinks: '',
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

        const ingredientNames = req.body.ingredients
            .split(', ')
            .map((item) => item.trim());

        if(!errors.isEmpty()){
            // if there are errors
            res.render('layout', {
                content: 'drink_form',
                title: 'create new drink',
                drinks: {drinkName: req.body.drinkName, ingredients: req.body.ingredientNames, instructions: req.body.instructions},
                errors: errors.array(),
            });
            return
         } 
    
    const ingredientArr = [];

for (const name of ingredientNames){
    let ingredient = await Ingredients.findOne({name}).exec();
    if(ingredient){
        ingredientArr.push(ingredient._id);
    } else {
        ingredient = new Ingredients({name});
        await ingredient.save();   
        ingredientArr.push(ingredient._id);
    };
};

//create Drink
    const drink = new Drinks({
        drinkName: req.body.drinkName,
        ingredients: ingredientArr,
        instructions: req.body.instructions,
    });

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
        
    }),
];

exports.drinks_delete_get = asyncHandler(async (req, res, next) => {
    const drink = await (Drinks.findById(req.params.id).exec())

    if(!drink){
        res.redirect('/catalog/drinks')
    } else {
        res.render('layout', {
        content: 'drink_delete',
        title: 'Drink Delete',
        drink: drink,
    });
    }
});

exports.drinks_delete_post = asyncHandler(async (req, res, next) => {

    Drinks.findByIdAndDelete(req.body.drinkid).exec();
    res.redirect('/catalog/drinks');
});

exports.drinks_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks update GET');
});

exports.drinks_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks update POST')
})