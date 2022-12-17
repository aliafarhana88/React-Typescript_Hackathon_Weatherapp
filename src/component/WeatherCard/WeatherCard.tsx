//code for fetching weather API
// returns an object of weather info
//import { Tracing } from "trace_events";
import useFetch from "../../Hook/useFetch";
import {useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./WeatherCard.css"


type geoObj = {
    lat : string | undefined;
    lon : string | undefined;
}

interface weatherArr {
    hour : [];
    temp : [];
    relhumidity : [];
    weatherCode : [];
}

interface weatherObj {
    hour : string;
    temperature : string;
    relhumidity : string;
    weatherCode: string;
}

function WeatherObject({lat, lon} : geoObj){

    //return undefined url of lat & lon is undefined. 
    // prevents fetching error
    let url = undefined;

    if (lat !== undefined && lon !== undefined){
        
        //console.log(`lat and lon are not undefined. this is lat ${lat}`)
        url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=weathercode`
    }
    
    //fetch the weather data using useFetch hook
    const weather = useFetch(url);
    //setWeather(weatherData)
    console.log(weather)

    const today = new Date();
   let thisHour = today.getHours(); //get the current hour
  // console.log(thisHour)


//setup a weather array consisting of an object of weather data in each hour
function weatherArr(arg: weatherArr) : weatherObj[]{
    const {hour, temp, relhumidity, weatherCode} = arg;
    let weatherArr = []; //initialise an empty array
    for(let i = 0; i < 23; i++){  // replace i<23 with i<hour.length if you want data for whole week
    let eachHour = {hour: hour[i], 
                    temperature: temp[i], 
                    relhumidity: relhumidity[i], 
                    weatherCode: weatherCode[i]}

    //push eachHour object into the weather array
    weatherArr.push(eachHour)
  }
  return weatherArr
  }


   if (weather !== undefined && weather !== "" && weather !== null){
   // console.log(weather.hourly?.time, weather?.hourly?.temperature_2m)
   //console.log(`This is hour 1: ${weather.hourly?.time[0]}`)

     //create arguments to pass into the function:
    const weatherArg = {
        hour: weather.hourly?.time,
        temp: weather.hourly?.temperature_2m,
        relhumidity: weather.hourly?.relativehumidity_2m,
        weatherCode: weather.hourly?.weathercode
    }

    //populate the weather array with fetched data 
    //this is hourly forecast for 24 hours. 
    const weatherData : weatherObj[] = weatherArr(weatherArg)
   //console.log(weatherData)

   //get the weather forecast of the current hour
   const thisHourWeather = (weatherData[thisHour])
   //console.log(thisHourWeather)
   //const typeweather = typeof(weather);
   //console.log(`this is weather ${weather}, type weather ${typeweather} this is url ${url}`)
   
   return(
   <div className = "weather-display">
        <h1>This is the weather today</h1>
        <h3> temperature  {thisHourWeather?.temperature}</h3>
        <h3> humidity {thisHourWeather?.relhumidity}</h3>

        
    {/* use fragment to wrap the children */}
    <>
        {/* {Object.entries(thisHourWeather).map((entry)=>{
           const [key, value] = entry
           const text = `${key} : ${value}`
           //console.log(key, value)
           console.log(text)
           return  <ListItem text = {text}/>
         })}; */}
    </>
         
    </div>)   

}else {
    console.log(`weather Data is not ready`)
    return <p>weather Data is not ready</p> ;
}

   
  
   
    
    


   
    
}

export default WeatherObject