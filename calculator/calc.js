const exp = require('express');
const bodyParser = require('body-parser');
//body-parser to parse the info we get sent through the post request

const app = exp();
//npm init to initialize it
//nodemon start to start the server

app.use(bodyParser.urlencoded({ extended: true }));
//bodyParser has modes:
//bodyParser.text() -->parse into text or bodyParser.json() parse as a json or bodyParser.urlencoded() to parse data that comes from an html form
//extended:true allows us to post nested objects
app.get("/", function (req, res) {
    //res.send() is for individual bits of data
    res.sendFile(__dirname + "/index.html"); //sends over the file to the browser in response

    //__dirname is like a variable holding onto current file's directory path be it in anyone's computer and concatenate to the path the name of the file we want to send back
});
app.post("/", function (req, res) {
    //req.body is the parsed version of the http request! and urlencoded gives access to the form data!
    //console.log(req.body) ==> {num1: '2', num2: '3', submit:''}
    //req.body.num1 to access it and they are of string type
    var ans = Number(req.body.num1) + Number(req.body.num2)
    res.send("The answer is " + ans);
})
//body-parser to parse the info we get sent through the post request

app.get("/bmiCalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
})
app.post("/bmiCalculator", function (req, res) {
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);
    var bmi = weight / (height ** 2);
    res.send("Your BMI is " + bmi);
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})