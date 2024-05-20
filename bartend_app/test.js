#! /usr/bin/env node

const userArgs = process.argv.slice(2);

const Drink = require("./models/drinks");

const drinks = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err)=> console.log(err));

async function main(){
    console.log("Connecting");
    await mongoose.connect(mongoDB);
    console.log("Connected");
    await createDrinks();
    console.log("Closing Mongoose");
    mongoose.connection.close();
}

async function drinkCreate(index, drinkName, ingredients, instructions){
    const drinkDetail = {
        drinkName: drinkName,
        ingredients: ingredients,
        instructions: instructions,
    };
    const drink = new Drink(drinkDetail);
    await drink.save();
    drinks[index] = drink;
    console.log(`Added ${drinkName}!`);
}

async function createDrinks(){
    console.log(`Adding Drinks...`);
await Promise.all([
    drinkCreate(0,
        "Margarita",
        ["tequila", "agave", "ice", "lime juice", "tajin"],
        "Add ice to mixing tin, add ingredients, shake and strain"
    ),
]);
}