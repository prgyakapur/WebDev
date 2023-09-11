const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name : {
        type:String,
        required: [true, 'Why no name?']
    },
    rating : {
        type:Number,
        min:1,
        max:10
    },
    review : String
});

const Fruit  = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    // name:"Mango",
    rating:10,
    review:"King of fruits, the best"
});

// const Kiwi = new Fruit({
//     name:"Kiwi",
//     rating:9,
//     review:"Best Fruit"
// });

// const Guava = new Fruit({
//     name:"Guava",
//     rating:8,
//     review:"Green in color"
// });

// const Cherry = new Fruit({
//     name:"Cherry",
//     rating:9,
//     review:"Small and sweet, red in color"
// });

// Fruit.insertMany([fruit,Kiwi, Guava, Cherry]);


fruit.save();



Fruit.find({}).then(foundItems => {
    foundItems.forEach(element => { 
        console.log(element.name);
    });
mongoose.connection.close();
});