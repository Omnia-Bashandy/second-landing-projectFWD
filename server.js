
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())


app.use(bodyParser.urlencoded ({ extended: false}));

app.use(bodyParser.json())
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

// Callback function to complete GET '/all'
const getAll = (req , res) => res.status(200).send(projectData);

//Get Rout
app.get("/all",getAll)
//callback function to complete Post'/add'
const postData =(req , res) =>{
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
app.post("/add" , postData)

const port = 4000;
const hostname = "127.0.0.1"
//test the server
const listiening = () =>{
    console.log(`server running at http://${hostname}:${port}/`);
}
//sing up the server
app.listen(port , listiening);
