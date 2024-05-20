const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://awellbro:Awellbro@drinks.gg5mw3e.mongodb.net/";
const client = new MongoClient(uri);

const db = client.db('drinksDb');
const collection = db.collection('drinksDb');

async function insert(){

    try {
        //await client.connect();
        //const first = await collection.findOne();
        //console.log(first)
        await collection.insertOne({
            name: 'testName',
            ingredients: ['test', 'arr'],
            instructions: 'testx',
        });
 
    } catch(error){
        console.log('error', error);
    } finally {
        await client.close();
    }
};

insert();





//this will get sent to the backend from html to submit to db
//back to the drawing board


// const formButton = document.querySelector("#sendIt");
// formButton.addEventListener('click', insert())

//     var drinkName = document.querySelector('#drinkName').value;
//     var drinkIngred = document.querySelector('#drinkIngred').value;
//     var drinkProcess = document.querySelector('#drinkProcess').value;
    

//     try {
  
//         await collection.insertOne({
//             name: drinkName,
//             ingredients: drinkIngred,
//             // ingredient should be an array ["rum", "pineapple", "ice", "cream of coconut"],
//             instructions: drinkProcess,
//         });