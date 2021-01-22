// Assignment 1 
// Setup web service!

const express = require("express")
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// get all
app.get("/api/items", (req, res) => {
    res.json({ message: `API Listening: ${req.params.id}` });
});

// tell the app to start listening 

app.listen(HTTP_PORT, () => {console.log(
    "Ready to handle requests on port " + HTTP_PORT
)})