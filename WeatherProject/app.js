const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=8e0ae2fdc2946a2cd3cc00484af48383";
    https.get(url, function (response) {
        console.log(response.statusCode);
    })
    res.send("Server is running")
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})