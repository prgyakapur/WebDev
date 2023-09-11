const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

var items = ["Drink Glass of Water", "Take Healthy Hair Drink", "Eat Breakfast"];
var workList = [];
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');



app.get("/",function(req,res){
    let day = date();
    res.render("list",{listTitle:day, newListItems:items});
});

app.get("/work", function(req, res){
    res.render("list",{listTitle:"Work List", newListItems:workList});
});


app.post("/", function(req,res){    

    let item = req.body.newItem;
    if(req.body.button === "Work"){
        workList.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }

});

app.listen(3000, function(){
    console.log("App started on port 3000!");
});
