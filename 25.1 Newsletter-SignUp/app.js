const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {

    const FirstName = req.body.firstName;
    const LastName = req.body.lastName;
    const EMail = req.body.eMail;

    const data =
    {
        members:
            [
                {
                    email_address: EMail,
                    status: "subscribed",
                    merge_fields:
                    {
                        FNAME: FirstName,
                        LNAME: LastName
                    }
                }
            ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/8aa90a87c0";

    const options = {
        method: "POST",
        auth: "nirmit:cc8ad398c7d931000e31931713d82bd8-us21"
    };

    const request = https.request(url, options, function (response) {

        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.post("/success", function (req, res) {
    res.redirect("/");
});



app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000!");
});

// apiKey = cc8ad398c7d931000e31931713d82bd8-us21
// Audience Id = 8aa90a87c0