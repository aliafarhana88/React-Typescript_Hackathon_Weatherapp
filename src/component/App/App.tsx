import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import{useState, useEffect} from "react"
import useFetch from "../../Hook/useFetch"
import InputField from '../InputField/InputField';
import WeatherObject from '../WeatherCard/WeatherCard';

type WeatherObjType = {
  city : string,
  country: string,
  mainWeather: object,
  weatherDescription : object 
}

function App() {
//fetch geocode (for latitude and longitude based on location)
//required input: city, country code (stretch goal: make this a dropdown)
//stretch goal: put this useFetch in a hook
const [cityState, setCityState] = useState("");
const [city, setCity] = useState("");
const [weather, setWeather] = useState<WeatherObjType>()

 
//get the lat and lon, round to two decimals
// const lat = (data[0]?.lat.toFixed(2))
// const lon = (data[0]?.lon.toFixed(2))
// console.log(`this is lat: ${lat}, this is lon: ${lon}`)

//this function filters the city input so that the city can be recognized by the weather API.
//smooth the city input. ie: fill gap with % and remove words after a comma ,
//add %20 if there are blank spaces in the cityInput. use \s regex that represent single white space. 
function filteredCityInput(city : string){
  const cityInputArr = city.split(","); //split the string into array, separated by comma. 
  if (cityInputArr.length>2){  //check the lengh. the there are more than 2 indices, remove the middle index
    cityInputArr.splice(1,1);
    return cityInputArr.join(",").replace(/\s/, `%20`) //join the array back into a single string. 
  }else{
    return cityInputArr.join(",").replace(/\s/, `%20`)
  }
}

function handleChange(e: React.KeyboardEvent<HTMLInputElement>){

  //set the city state according to the input value when Enter button is pressed. 
  if (e.key === "Enter"){
    const rawCityInput = (e.target as HTMLInputElement).value //the raw input by user
    setCityState(rawCityInput)    
    setCity(filteredCityInput(cityState));

  }
  
}

console.log(city)

const openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_KEY;
//const geoCodeURL = cityState === ""? undefined :  `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${openWeatherKey}`;

const url = city === "" ? undefined : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${openWeatherKey}`;

const data = useFetch(url);


  useEffect(()=>{
    
    if (data !== undefined && data !== null && data !== "" && data !== false){

      //construct weather object 
      const weatherObj = {
        city : data.city.name,
        country: data.city.country,
        mainWeather: data.list[0].main,
        weatherDescription : data.list[0].weather[0] 
      }
      // console.log(data.list[0].weather[0])
      // console.log(data.list[0].weather[0].icon)
      
      
    
    setWeather(weatherObj)}}, [data])
  

    // console.log(data.list[0].main)
    // // // console.log(data.list[0].dt_txt)
  console.log(data)


// function handleClick(e : React.MouseEvent<HTMLElement, MouseEvent>){
// //setCityState((e.target as HTMLInputElement).value)
// console.log(e)
// }

const today = new Date();
// let thisDate = today.toLocaleString("en-GB", {
//   day: "numeric",
//   month: "short",
//   year: "numeric",
// });
let thisDay = today.toDateString();
let thisHour = today.toLocaleTimeString('en-GB', {  hour12: true,
                                                    hour: "numeric", 
                                                    minute: "numeric"}); //get the current hour
// console.log(thisHour)



  return (
    <div className="App">
      <header className="App-header">
        <p>weather in {weather?.city}, {weather?.country}</p>
        <p>{`${thisDay} ${thisHour}`}</p>
      </header>
      <InputField handleChange = {handleChange} className = "input-field" placeholder = "enter your city"/>
      <WeatherObject weather = {weather} data = {data} />
      
    </div>
  );
}



export default App;
