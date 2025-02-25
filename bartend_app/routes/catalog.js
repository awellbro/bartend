const express = require('express');
const router = express.Router();

const drinks_controller = require('../controllers/drinksController');
const ingredient_controller = require('../controllers/ingredientController')

// catalog home
router.get('/', drinks_controller.index);

//GET request for creating a new drink
router.get('/drink/create', drinks_controller.drinks_create_get);

//POST request for creating a new drink
router.post('/drink/create', drinks_controller.drinks_create_post);

//GET request for deleting a drink
router.get('/drink/:id/delete', drinks_controller.drinks_delete_get);

//POST request for deleting a drink
router.post('/drink/:id/delete', drinks_controller.drinks_delete_post);

//GET request for updating a drink
router.get('/drink/:id/update', drinks_controller.drinks_update_get);

//POST request for updating a drink
router.post('/drink/:id/update', drinks_controller.drinks_update_post);

//GET for a specific drink
router.get('/drink/:id', drinks_controller.drinks_detail);

//GET for a list of all drinks
router.get('/drinks', drinks_controller.drinks_list);

// ingredients controllers

//GET for Ingredient detail
router.get('/ingredient/:id', ingredient_controller.ingredient_detail);

router.get('/ingredient/:id/delete', ingredient_controller.ingredient_delete_get);

router.post('/ingredient/:id/delete', ingredient_controller.ingredient_delete_post);

router.get('/ingredients', ingredient_controller.ingredients)

module.exports = router;