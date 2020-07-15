const request = require("request")
const { error } = require("console")
const forecast = (latitude, longitude, callback) => {
    //const url =  "http://api.weatherstack.com/current?access_key=f5df15837cc48f3efe247cf8c6e3ef44&query=37.8267,-122.4233&units=f"
    const url = "http://api.weatherstack.com/current?access_key=f5df15837cc48f3efe247cf8c6e3ef44&query="+longitude+","+latitude+"&units=f"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect weather service !", undefined)
        } else if (body.error) {
            callback("Unable to Find Location :( Try different location :)", undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degress out. It feels Like "+body.current.feelslike+" degress out. The Humidity is  "+ body.current.humidity + "%.")
     }
    })
}
module.exports = forecast