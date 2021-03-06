var apiKey = "61b20c652c853ac048c8f20d419c2cd0";
var city = $("#city");

// var currentWeatherIcon =
//   "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
// var cityUrl =
//   "https://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&units=imperial&appid=" +
//   apiKey;

var currentHour = moment().hour();
var time = moment();
$("#time").text(time.format("dddd, MMMM Do"));

function fetchWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city.val() +
      "&appid" +
      apiKey +
      "&units=imperial"
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);

      var cityNames = $("#city-names");
      var temperature = $("#temperature");
      var humidity = $("#humidity");
      var windSpeed = $("#windspeed");
      var icon = data.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
      $(".icon").attr("src", iconUrl);
      cityNames.text(data.name + moment().format("MM/DD/YYYY"));
      temperature.text(parseInt(data.main.temp) + " °F");
      humidity.text(parseInt(data.main.humidity) + " %");
      windSpeed.text(data.wind.speed + " MPH");
      var lt = data.coord.lat;
      var ln = data.coord.lon;
      fetchUv(lt, ln);

      var updateCity = [];
      updateCity = JSON.parse(localStorage.getItem("city"));
      if (updateCity !== null) {
        updateCity = [];
        updateCity.push(city.val());
        localStorage.setItem("city", JSON.stringify(updateCity));
      }
    });
}

function fetchUv(lt, ln) {
  fetch(
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      apiKey +
      "&lat" +
      lt +
      "&lon" +
      ln
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var uvIndex = $("#uv");
      uvIndex.text("UV Index: " + data.value);
    });
}
// 5day forecast cards
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

      var day1 = $("#date1");
      day1.text(moment().add(1, "day").format("MM/DD/YYYY"));
      var temp1 = $("#cardTemp1");
      temp1.text(data.list[3].main.temp + " °F");
      var humid1 = $("#cardHumidity1");
      humid1.text(data.list[3].main.humidity + " %");

      var day2 = $("#date2");
      day2.text(moment().add(2, "days").format("MM/DD/YYYY"));
      var temp2 = $("#cardTemp2");
      temp2.text(data.list[11].main.temp + " °F");
      var humid2 = $("#cardHumidity2");
      humid2.text(data.list[11].main.humidity + " %");

      var day3 = $("#date3");
      day3.text(moment().add(3, "days").format("MM/DD/YYYY"));
      var temp3 = $("#cardTemp3");
      temp3.text(data.list[19].main.temp + " °F");
      var humid3 = $("#cardHumidity3");
      humid3.text(data.list[19].main.humidity + " %");

      var day4 = $("#date4");
      day4.text(moment().add(4, "days").format("MM/DD/YYYY"));
      var temp4 = $("#cardTemp4");
      temp4.text(data.list[27].main.temp + " °F");
      var humid4 = $("#cardHumidity4");
      humid4.text(data.list[27].main.humidity + " %");

      var day5 = $("#date5");
      day5.text(moment().add(5, "days").format("MM/DD/YYYY"));
      var temp5 = $("#cardTemp5");
      temp5.text(data.list[35].main.temp + " °F");
      var humid5 = $("#cardHumidity5");
      humid5.text(data.list[35].main.humidity + " %");
    });
}

// function keepSearch(event) {
//   $(listEl).attr("class", "list-group-item");

//   var listEl = event.target;
//   if (event.target.matches("li")) {
//     savedcity - listEl.textContent.trim();
//     fetchWeather(savedcity);
//   }

$("#search-button").on("click", function (event) {
  event.preventDefault();
  fetchWeather();
  fetchForecast();
});
