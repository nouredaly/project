// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//body-parser allow the backend to access json 
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");

// Enable all cors requests
app.use(cors());



// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.get('/getData', (req,res)=>{
    res.send(projectData)
})

app.post('/savingData',(req,res)=>{
    const data = req.body
    projectData.temp = data.main.temp
    projectData.name = data.name
    projectData.feelings = data.feelings
    projectData.weather = data.weather[0].main
    projectData.date = data.date
    res.status(200).json(data)
});

const port = 5432
app.listen(port, ()=>{
    console.log(`server is online on http://localhost:${port}`)
})