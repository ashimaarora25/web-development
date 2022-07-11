const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static("public")); //to serve up static files such as styles.css or png file
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    res.send("Thank you for signing up to our newsletter!")
    console.log(req.body.firstName);
})

//5eb6de5bcb6086a446c3a37eb3bd66b3-us10

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});