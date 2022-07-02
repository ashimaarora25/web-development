const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=8e0ae2fdc2946a2cd3cc00484af48383&units=imperial";
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
            res.write("<h1>The temperature in " + weatherData.name + " is " + temp + " degrees Fahrenheit.</h1>");
            res.write("<h3>The weather description is " + weatherDesc + ".</h3>");
            res.write("<img src=" + urlIcon + ">");
            res.send();

        })
    })

})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})