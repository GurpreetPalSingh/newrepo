/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Gurpreet Singh Student ID: 074913146 Date: Jan 22/2020
*  Heroku Link: https://agile-earth-14436.herokuapp.com
*
********************************************************************************/ 


const express = require("express")
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://dbUser:money123@web422.duwz8.mongodb.net/sample_restaurants?retryWrites=true&w=majority");

app.use(bodyParser.json());
app.use(cors());

// ************* API Routes

// POST /api/restaurants -- This route uses the body of the request to add a new "Restaurant" document to the collection 
app.post("/api/restaurants", (req,res) => {
    db.addNewRestaurant(req.body)
    .then(() => {
            res.status(201).json(`new restaurant successfully added`);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


// GET /api/restaurants -- This route must accept the numeric query parameters "page" and "perPage" as well as the string parameter "borough", ie: /api/restaurants?page=1&perPage=5&borough=Bronx.  It will use these values to return all "Restaurant" objects for a specific "page" to the client as well as optionally filtering by "borough", if provided.
app.get("/api/restaurants", (req,res) => {
    db.getAllRestaurants(req.query.page, req.query.perPage)
        .then((restaurants) => {
            res.status(200).json(restaurants);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});


// GET /api/restaurants -- This route must accept a numeric route parameter that represents the _id of the desired restaurant object, ie: /api/restaurants/ 5eb3d668b31de5d588f4292e.  It will use this parameter to return a specific "Restaurant" object to the client.
app.get("/api/restaurants/:id", (req,res) => {
    db.getRestaurantById(req.params.id)
        .then((restaurants) => {
            res.status(200).json(restaurants);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});


// PUT /api/restaurants -- This route must accept a numeric route parameter that represents the _id of the desired restaurant object, ie: /api/restaurants/5eb3d668b31de5d588f4292e as well as read the contents of the request body.
app.put("/api/restaurants/:id", (req,res) => {
    db.updateRestaurantById(req.body, req.params.id)
        .then(() => {
            res.status(200).json(`restaurant ${req.body._id} successfully updated`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});


// DELETE /api/restaurants -- This route must accept a numeric route parameter that represents the _id of the desired restaurant object, ie: /api/restaurants/5eb3d668b31de5d588f4292e
app.delete("/api/restaurants/:id", (req,res) => {
    db.deleteRestaurantById(req.params.id)
        .then(() => {
            res.status(200).json(`restaurant ${req.params.id} successfully deleted`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

// ************* Initialize the Service & Start the Server

// invoke the db.initialize() method and only start the server once it has succeeded,  otherwise we should show the error message 

db.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});
