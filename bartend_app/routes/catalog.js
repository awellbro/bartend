const express = require('express');
const router = express.Router();

const drinks_controller = require('../controllers/drinksController');

// catalog home
router.get('/', drinks_controller.index);

//GET request for creating a new drink
router.get('/drinks/create', drinks_controller.drinks_create_get);

//POST request for creating a new drink
router.post('/drinks/create', drinks_controller.drinks_create_post);

//GET request for deleting a drink
router.get('/drinks/delete', drinks_controller.drinks_delete_get);

//POST request for deleting a drink
router.post('/drinks/delete', drinks_controller.drinks_delete_post);

//GET request for updating a drink
router.get('/drinks/update', drinks_controller.drinks_update_get);

//POST request for updating a drink
router.post('/drinks/update', drinks_controller.drinks_update_post);

//GET for a specific drink
router.get('/drinks/:id', drinks_controller.drinks_detail);

//GET for a list of all drinks
router.get('drinks/', drinks_controller.drinks_list);

module.exports = router;