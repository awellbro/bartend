#!/usr/bin/env node

//run "node test2" in terminal and it works. build off of this.

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Drink = require('./models/drinks');
const path = require('path');


// Create Express app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const mongoDB = 'mongodb+srv://awellbro:Awellbro@drinks.gg5mw3e.mongodb.net/drinksDb?retryWrites=true&w=majority&appName=drinks';
mongoose.set("strictQuery", false);

mongoose.connect(mongoDB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// HTML form to add a new drink
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/add-drink', async (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});