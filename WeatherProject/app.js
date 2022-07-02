const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const city = req.body.cityName;
    const apiKey = "8e0ae2fdc2946a2cd3cc00484af48383";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) { //when response starts getting the data
            //data then is json but in hexadecimal format, we want it as a javascript object and we will get it using JSON.parse

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;

            const weatherDesc = weatherData.weather[0].description;
            console.log(weatherDesc);
            const icon = weatherData.weather[0].icon;
            const urlIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


            //Only 1 res.send() but can have multiple res.write()
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Fahrenheit.</h1>");
            res.write("<h3>The weather description is " + weatherDesc + ".</h3>");
            res.write("<img src=" + urlIcon + ">");
            res.send();

        })
    })
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})