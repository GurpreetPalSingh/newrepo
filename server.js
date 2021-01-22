// Assignment 1 
// Setup web service!


const express = require("express")
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://dbUser:money123@web422.duwz8.mongodb.net/sample_restaurants?retryWrites=true&w=majority");

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

db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
