const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static("public")); //to serve up static files such as styles.css or png file
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});