const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res) {
    const query = req.body.zipCode;
    const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + query + "&appid=8d2e6b0f640378bfac7e22b5c457c0c9"
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description;
            res.write("<h1>The weather condition of zipcode " + query + " is currently " + description + "</h1>");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})