var searchHist= [];
var weatherKey= '14c3dd75a39dcc09a72473e3cdf1eb92';
var searchIn = document.querySelector("#search-bar");
var searchBtn=document.querySelector('#submit-btn');
var searchEl= document.getElementById('search-card');
var todayCon= document.querySelector('.lead')
var foreCon= document.getElementById('card-container');
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
    getForecast();
}

function getForecast(){
    // todayCon.innerHTML=' ';
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
        // var dayTwo= data.list[12].main
        // var condTwo= data.list[12].weather[0].description
        // var dayThree= data.list[20].main
        // var condThree= data.list[20].weather[0].description
        // var dayFour=data.list[28].main
        // var condFour= data.list[28].weather[0].description
        // var dayFive=data.list[36].main
        // var condFive= data.list[36].weather[0].description
        // console.log(dayOne);
        // console.log(condOne);
        // console.log(data.city.name);
        // document.getElementById('day-1-temp').append(`Temp: ${dayOne.temp} F`);
        // document.getElementById('day-1-conditions').append(`Conditions: ${condOne} `);
        // document.getElementById('day-1-humidity').append(`Humidity: ${dayOne.humidity} `);
        // document.getElementById('day-2-temp').append(`Temp: ${dayTwo.temp} F`);
        // document.getElementById('day-2-conditions').append(`Conditions: ${condTwo} `);
        // document.getElementById('day-2-humidity').append(`Humidity: ${dayTwo.humidity} `);
        // document.getElementById('day-3-temp').append(`Temp: ${dayThree.temp} F`);
        // document.getElementById('day-3-conditions').append(`Conditions: ${condThree} `);
        // document.getElementById('day-3-humidity').append(`Humidiy: ${dayTwo.humidity} `);
        // document.getElementById('day-4-temp').append(`Temp: ${dayFour.temp} F`);
        // document.getElementById('day-4-conditions').append(`Conditions: ${condFour}`);
        // document.getElementById('day-4-humidity').append(`Humidity: ${dayFour.humidity} F`);
        // document.getElementById('day-5-temp').append(`Temp: ${dayFive.temp} F`);
        // document.getElementById('day-5-conditions').append(`Conditions: ${condFive} `);
        // document.getElementById('day-5-humidity').append(`Humidity: ${dayFive.humidity} F`)
    });
}

searchBtn.addEventListener('click', getWeather);