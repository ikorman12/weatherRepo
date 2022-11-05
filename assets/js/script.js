var weatherKey= '14c3dd75a39dcc09a72473e3cdf1eb92';
var weatherWidget = document.querySelector(".weather");

// function to get weather 
async function getWeather(lat, lon) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=66b15a5b3951d15de56c5d2c4e2ddcba&units=imperial"
    const response = await fetch(weatherUrl);
    var data = await response.json();
    var temp = data.main.temp;
    var city = data.name
    var feelsLike = data.main.feels_like;
    var weatherDesc = data.weather[0].main;
    document.getElementById('weather').innerHTML =
      `
    <h3>${city}</h3>
    <p>Temperature: ${temp}</p>
    <p>Feels Like: ${feelsLike}</p>
    <p>Conditions: ${weatherDesc}</p>
    `;
  }
  //get forecast function
  async function getForecast(lat, lon) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=66b15a5b3951d15de56c5d2c4e2ddcba&units=imperial"
    console.log(forecastUrl);
    const response = await fetch(forecastUrl);
    var data = await response.json();
    var forecastData = [data.list[0].main.temp, data.list[0].main.feels_like, data.list[0].weather[0].main, data.city.name]
    document.getElementById('forecast').innerHTML =
      `
    <h3>In 3 hours</h3>
    <p>Temperature: ${forecastData[0]}</p>
    <p>Feels Like: ${forecastData[1]}</p>
    <p>Conditions: ${forecastData[2]}</p>
    `;
  }