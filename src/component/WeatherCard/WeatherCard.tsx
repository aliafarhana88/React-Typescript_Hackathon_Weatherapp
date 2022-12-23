//code for fetching weather API
// returns an object of weather info
//import { Tracing } from "trace_events";
import useFetch from "../../Hook/useFetch";
import {useState } from "react";
import ListItem from "../ListItem/ListItem";
import "./WeatherCard.css"
import {TbTemperatureCelsius} from "react-icons/tb";


function WeatherObject(prop : any){

    const {weather, data} = prop;

//converting Kelvin to centigrade: 
function KelvintoC(tempK:number):number{
    const tempC =  tempK - 273.15;
    return Math.ceil(tempC)
}

if(weather !== undefined){
    


//render the weather icon
const iconCode = weather.weatherDescription.icon;

   return(
    <div className = "border-display">
        <div className = "weather-display">
            {/* <h1>This is the weather in {weather.city}, {weather.country} </h1> */}
            <div className = "temp-display">
            <h1> {KelvintoC(weather.mainWeather.temp)} <TbTemperatureCelsius/></h1>
            <img src = {`https://openweathermap.org/img/wn/${iconCode}@2x.png`} alt = "weather icon"/>
            </div>
            <h3> {weather.weatherDescription.description}</h3>
            <h3> Feels like {KelvintoC(weather.mainWeather.feels_like)} <TbTemperatureCelsius/></h3>
            <h3> Humidity {weather.mainWeather.humidity}%</h3>
           


        
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
         
        </div>
    </div>)   

}else {
    console.log(`weather Data is not ready`)
    return (

            <div className = "default-display">
            <p></p> 
            </div>);
}

   
  
   
    
    


   
    
}

export default WeatherObject