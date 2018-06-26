function triggerGetWeather(callback) {
  const url = "/weather"
  $.getJSON(url, callback)
}


function splitData(data) {
  let aprilData = data.slice(0, 30)
  let mayData = data.slice(30, 61)
  renderData(aprilData, "april-contain")
  renderData(mayData, "may-contain")
}

function renderData(monthData, monthDiv) {

  let totalHeat = 0
  let totalAir = 0

  monthData.forEach(day => {
    if (day.air > 0) {
      totalAir += 1
    }
    if (day.heat > 0) {
      totalHeat += 1
    }
  })


  let rows = monthData.map(day => {
    return (
  `    <div>
        <div>${day.date}</div>
        <div>${day.air}</div>
        <div>${day.heat}</div>
      </div>`
    )
  })

  let chartHtml = `
    <div>
      <div>
        <div>Summary</div>
        <div>Total days where heat kicked on at least once: ${totalHeat}</div>
        <div>Total days where AC kicked on at least once: ${totalAir}</div>
        <div>Date</div>
        <div>Hours of AC</div>
        <div>Hours of Heat</div>
      </div>

      ${rows.join("")}
    </div>
  `

let renderDiv = document.getElementById(monthDiv)
renderDiv.innerHTML = chartHtml

}

function handleApp() {
  triggerGetWeather(splitData)
}

function openMonth(event, month) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(month).style.display = "block";
    event.currentTarget.className += " active";
}

$(handleApp)
