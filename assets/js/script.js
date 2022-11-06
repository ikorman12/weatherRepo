var searchHist= [];
var weatherKey= '14c3dd75a39dcc09a72473e3cdf1eb92';
var searchIn = document.querySelector("#search-bar");
var searchBtn=document.querySelector('#submit-btn');
var searchEl= document.getElementById('search-card');
var todayCon= document.querySelector('.lead')
var foreCon= document.getElementById('card-container');
var searchsCon= document.querySelector('.search-history')
var url= `https://api.openweathermap.org/data/2.5/weather?q=`

function getWeather(){
    var cityName= searchIn.value
    var weatherUrl =`${url}${cityName}&appid=${weatherKey}&units=imperial`
    fetch (weatherUrl).then((response)=> response.json())
    .then((data)=>{
        console.log(data)
        var temp= data.main;
        var hum= data.main.humidity;
        var weather= data.weather[0].description;
        console.log (temp);
        console.log (weather);
        todayCon.append(`
        Temperature: ${temp.temp}, 
        Conditions: ${weather}, 
        Humidity: ${hum}`);
    });
    getForecast();
}

function getForecast(){
    var cityName= searchIn.value
    var fUrl= `https://api.openweathermap.org/data/2.5/forecast?q=`
    var forecastUrl =`${fUrl}${cityName}&appid=${weatherKey}&units=imperial`
    fetch (forecastUrl).then((response)=> response.json())
    .then((data)=>{
        console.log(data);
        var dayOne= data.list[4].main
        var condOne= data.list[4].weather[0].description
        var forecastList = data.list
        for(var i=0; i<(forecastList.length/8);i++){
            var dayI= i*8;
            var date = moment(forecastList[dayI].dt_txt).format('MM/DD/YYYY');
            var weatherCon= forecastList[dayI].weather[0].description;
            //renders date in h4
            foreCon.children[i].children[0].append(date);
            //remnders city
            foreCon.children[i].children[1].append(data.city.name);
            //renders conditions
            foreCon.children[i].children[2].append(weatherCon);
            //redners humidity
            foreCon.children[i].children[3].append(`Humidity: ${forecastList[dayI].main.humidity} %`);
            //renders temp
            foreCon.children[i].children[4].append(`Temp: ${forecastList[dayI].main.temp} F`);
        }
    });
}

searchBtn.addEventListener('click', getWeather);