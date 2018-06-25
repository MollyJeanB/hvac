const express = require("express");
const app = express();
const axios = require("axios")

app.use(express.static("public"));

let results = []

let count = 0

app.get("/weather", (req, res) => {
  let weatherLoop = new Promise(function(resolve, reject) {
    const secondsInDay = 86400
    for (let i = 1522566000; i <= (secondsInDay * 2) + 1522566000; i += secondsInDay) {
      getWeatherFromAPI(i)
    }
      resolve(results)
  })
  .catch(err => {
    console.log(err)
  })
    weatherLoop.then(results => res.send(results))

});


function getWeatherFromAPI(i) {
  return axios({
    method: "get",
    url: `https://api.darksky.net/forecast/dd37a44ba2f13043e928db948a4162e6/45.5898,-122.5951,${i}`,
  })
  .then(data => {
    manipulateData(data)
  }).catch(err => {
    console.log(err)
  })
}

function manipulateData(data) {
  let resultObject = {
    date: data.data.currently.time,
    air: 0,
    heat: 0
  }
  data.data.hourly.data.forEach(hour => {
    if (hour.temperature > 75) {
      resultObject.air +=1
    } else if (hour.temperature < 62) {
      resultObject.heat +=1
    }
  })
  console.log(resultObject)
  results.push(resultObject)
  count++
  console.log(results, count)
}


app.listen(process.env.PORT || 8080, () =>
  console.log("HVAC report listening on port 8080!")
);
