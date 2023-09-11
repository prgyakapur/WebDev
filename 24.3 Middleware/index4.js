import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/public/index.html");
})

app.post("/submit",(req, res)=>{
  const part1 = req.body.street;
  const part2 = req.body.pet;
  const answer = part1+part2;
  res.write("<h1>Your band name is:</h1>");
  res.write(`<h2>${answer}</h2>`);
  res.send();
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
