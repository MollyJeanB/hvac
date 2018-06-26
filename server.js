const express = require("express");
const app = express();
const axios = require("axios")
app.use(express.static("public"));


app.get("/weather", (req, res) => {
  let timestampArr = createTs(1522566000, 60);

  Promise.all(timestampArr.map(ts => {
    return axios({
      method: "get",
      //if this code were being pushed to GitHub, put URL in a process.env for key security
      url: `https://api.darksky.net/forecast/f648f417141dc92f572be83e29756ce1/45.5898,-122.5951,${ts}`,
    }).then(data => data.data)
  }))
  .then(data => {
    let responseData = []
    data.forEach(day => {
      let dayObject = manipulateData(day)
      responseData.push(dayObject)
    })
    res.send(responseData);
  })
  .catch(err => {
    console.log(err)
  });
});


function createTs(startTs, days) {
  let arr = [];
  let secondsInDay = 86400;
  for (let i = startTs; i <= (secondsInDay * days) + startTs; i += secondsInDay) {
    arr.push(i);
  }

  return arr;
}

function manipulateData(data) {
  let date = new Date(data.currently.time * 1000)
  let dateString = date.toString().slice(0, 10)
  let resultObject = {
    date: dateString,
    air: 0,
    heat: 0
  }
  data.hourly.data.forEach(hour => {
    if (hour.temperature > 75) {
      resultObject.air +=1
    } else if (hour.temperature < 62) {
      resultObject.heat +=1
    }
  })
  return resultObject
}


app.listen(process.env.PORT || 8080, () =>
  console.log("HVAC report listening on port 8080!")
);
