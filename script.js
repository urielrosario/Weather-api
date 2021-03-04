var apiKey = "61b20c652c853ac048c8f20d419c2cd0";
var city = $("#city");

var currentHour = moment().hour();
var time = moment();
$("#time").text(time.format("dddd, MMMM Do"));

function fetchWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid" +
      apiKey +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var icon = $("#icon");
      var cityNames = $("#city-names");
      var temperature = $("#temperature");
      var humidity = $("#humidity");
      var windSpeed = $("#windspeed");
      cityNames.text(data.name + time.format("MM/DD/YYYY"));
      icon.text(data.weather[0].icon);
      temperature.text("Temperature: " + data.main.temperature);
      humidity.text("Humidity (%): " + data.main.humidity);
      windSpeed.text("Wind Speed (MPH): " + data.wind.speed);
      var lt = data.coord.lat;
      var ln = data.coord.lon;
      fetchUv(lt, ln);
    });
}

function fetchUv(lt, ln) {
  fetch(
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lt +
      "&lon" +
      ln +
      "&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var uvIndex = $("#uv");
      uvIndex.text(data.value);
    });
}
function fetchForecast() {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city.val() +
      "&appid=" +
      apiKey +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var date0 = $("#date0");
      var humidity0 = $("cardHumidity0");
      var temp0 = $("#cardtemp0");
      date0.text(moment().add(1, "d").format("MM/DD/YYYY"));
      temp0.text("Temperature:" + data.list[3].main.humidity);
    });
}

("https://api.openweathermap.org/data/2.5/weather?q=");
