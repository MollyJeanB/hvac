
function triggerGetWeather(callback) {
  const url = "/weather"
  $.getJSON(url, callback)
}



function renderData(data) {
  console.log(data)
}


function handleApp() {
  triggerGetWeather(renderData)
}

//called on page load
$(handleApp)
