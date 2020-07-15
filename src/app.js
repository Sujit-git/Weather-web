const path = require("path")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const express = require("express")
const hbs = require("hbs")
const { error } = require("console")
const { response } = require("express")

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectorypath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//set up handlebars engine and views location
app.set('view engine', 'hbs')  //"key" , "value" 
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static library to serve
app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Sujit Khopade"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Sujit Khopade"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text",
        title: "Help",
        name: "Sujit Khopade"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide address"
        })
    }
    geocode(req.query.address,(error,{ latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forecast :"It is snowing",
    //     location : "philadelphia",
    //     address : req.query.address
    // })
})




app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "error",
        name: "Sujit Khopade",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        name: "Sujit Khopade",
        errorMessage: "Page Not Found"
    })
})

app.listen(port, () => {                                //3000 is a root name for browser
    console.log("Server is up on port " + port)
})
