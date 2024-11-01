var express = require('express');
var router = express.Router();

var path = require('path');
var Drink = require('../models/drinks');
//const app = express();

//  /* GET home page. */
//  router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
//  });

// HTML form to add a new drink
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Handle form submission
router.post('/add-drink', async (req, res) => {
  const { drinkName, ingredients, instructions } = req.body;
  const ingredientsArray = ingredients.split(',').map(item => item.trim());

  try {
      const newDrink = new Drink({
          drinkName: drinkName,
          ingredients: ingredientsArray,
          instructions: instructions,
      });
      await newDrink.save();
      res.redirect('/?drinkName=' + encodeURIComponent(drinkName));
  } catch (err) {
      res.status(500).send('Error adding drink');
  }
});
module.exports = router;
