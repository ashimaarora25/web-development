const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');

const app = express();
app.use(express.static("public")); //to serve up static files such as styles.css or png file
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {

    const firstName = req.body.firstName;
    const LastName = req.body.LastName;
    const email = req.body.email;
    //sample data posted to mailchimp with keys that mailchimp will recognize -- see documentation on POST 
    //Merge fields let you save custom information about contacts, which can then be used to personalize campaigns.
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: LastName,
                }

            }
        ]

    }
    const jsonData = JSON.stringify(data);

    //POST request to Mailchimp using https.request node module
    const url = "https://us10.api.mailchimp.com/3.0/lists/23e4d3ffeb/";
    const options = {
        method: "POST",
        auth: "ashima:5eb6de5bcb6086a446c3a37eb3bd66b3-us10"
    }
    const request = https.request(url, options, function (response, req) {
        if (response.statusCode === 200)
            res.sendFile(__dirname + "/success.html")
        else
            res.sendFile(__dirname + "/failure.html")

        response.on("data", (data) => { //data we get back
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData); //save http request in a variable and use it to write data.
    request.end();

});

//redirects the user to the home route
app.post("/failure", function (res, req) {
    res.redirect("/");
})

//5eb6de5bcb6086a446c3a37eb3bd66b3-us10
//audienceid: 23e4d3ffeb --which list it is the ID of

//--data '{"tags": [{"name": "Influencer", "status": "active"}]}'
app.listen(3000 || process.env.PORT, () => {
    console.log("Server listening on port 3000");
});

//process.env.PORT for Heroku