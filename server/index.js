const express = require("express")
const app = express()
const bodyParser = require('body-parser');

// Setup server port
const port = process.env.PORT || 3001;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// listen for requests
app.listen(3001, () => {
    console.log("running on port 3001")
})