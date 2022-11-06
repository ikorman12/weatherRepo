var searchHist= [];
var weatherKey= '14c3dd75a39dcc09a72473e3cdf1eb92';
var searchIn = document.querySelector("#search-bar");
var searchBtn=document.querySelector('#submit-btn');
var searchEl= document.getElementById('search-card');
var todayCon= document.querySelector('.lead')
var foreCon= document.getElementsByClassName('forecast-container')
var searchsCon= document.querySelector('.search-history')
var url= `https://api.openweathermap.org/data/2.5/weather?q=`

// function getSearch() {
//     searchsCon.innerHTML='';
//     for(var i=searchHist.length-1; i>=0, i--)
//     {
//     var result=document.createElement('button');
//         btn.setAttribute('class', 'history-btn');
//         btn.setAttribute('data', searchHist[i]);
//         btn.textContent=searchHist[i];
//         searchsCon.append(btn);
//     }
// };

function getWeather(){
    // todayCon.innerHTML=' ';
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


}

searchBtn.addEventListener('click', getWeather);