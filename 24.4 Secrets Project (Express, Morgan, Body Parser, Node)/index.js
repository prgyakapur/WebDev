import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));



app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});


app.post("/check",(req, res)=>{
    const passwordCheck = req.body.password;
    if (passwordCheck === "Nirmit"){
        res.redirect("/Submit");
    }
    else{
        res.redirect("/");
    }
});

app.get("/Submit",(req, res)=>{
    res.sendFile(__dirname + "/public/secret.html");
});

app.listen( 3000,() =>{
    console.log(`Listening on port ${port}`)
});