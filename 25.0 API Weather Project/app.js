const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    
    res.sendFile(__dirname + "/index.html");
   
});

app.post("/", function(req, res){
    
    var cityName = req.body.city;
    var apiKey = "a685a7f0b091ee57e03de57e6e95aa6a";
    var unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const tempratature = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon  + "@2x.png";
            res.write("<h1>The temprature in " + cityName + " is " + tempratature + " degree celsius</h1>");
            res.write("<h3>The weather in " + cityName + " is " + desc + "</h3>");
            res.write("<img src= " + imgURL + ">");
            res.send();
        });

    });



});

app.listen(3000, function () {
    console.log("You server started at port 3000");
});



