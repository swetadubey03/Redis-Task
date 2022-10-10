const express = require('express');
const dotenv =require('dotenv')
const bodyParser = require('body-parser')

//App initialize
const app = express();

const port = process.env.PORT || 5000;


//middleware
app.use(bodyParser.json())


//api
app.use("/api/weather", require("./routes/weatherRoutes"))


//app listen
app.listen(port, ()=>{console.log(`listening on port ${port}`)})

