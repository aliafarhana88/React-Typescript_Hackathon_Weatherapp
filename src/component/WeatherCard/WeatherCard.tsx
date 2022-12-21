//code for fetching weather API
// returns an object of weather info
//import { Tracing } from "trace_events";
import useFetch from "../../Hook/useFetch";
import {useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./WeatherCard.css"


function WeatherObject(prop : any){

    const {weather, data} = prop;
   
   

//setup a weather array consisting of an object of weather data in each hour
// function weatherArr(arg: weatherArr) : weatherObj[]{
//     const {hour, temp, relhumidity, weatherCode} = arg;
//     let weatherArr = []; //initialise an empty array
//     for(let i = 0; i < 23; i++){  // replace i<23 with i<hour.length if you want data for whole week
//     let eachHour = {hour: hour[i], 
//                     temperature: temp[i], 
//                     relhumidity: relhumidity[i], 
//                     weatherCode: weatherCode[i]}

//     //push eachHour object into the weather array
//     weatherArr.push(eachHour)
//   }
//   return weatherArr
//   }


if(weather !== undefined){  

//render the weather icon
const iconCode = weather.weatherDescription.icon;

   return(
   <div className = "weather-display">
        <h1>This is the weather in {weather.city}, {weather.country} </h1>
        <h3> temperature (in ICON)  {weather.mainWeather.temp}</h3>
        <h3> {weather.weatherDescription.description}</h3>
        <h3> feels like {weather.mainWeather.feels_like}</h3>
        <h3> humidity {weather.mainWeather.humidity}</h3>
        <img src = {`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt = "weather icon"/>


        
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
    return <div><p>render default div here when weather input is required</p> </div>;
}

   
  
   
    
    


   
    
}

export default WeatherObject