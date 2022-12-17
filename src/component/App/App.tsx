import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import{useState, useEffect} from "react"
import useFetch from "../../Hook/useFetch"
import InputField from '../InputField/InputField';
import WeatherObject from '../WeatherCard/WeatherCard';

function App() {
//fetch geocode (for latitude and longitude based on location)
//required input: city, country code (stretch goal: make this a dropdown)
//stretch goal: put this useFetch in a hook
const [cityState, setCityState] = useState("");


const openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_KEY;
const city = `London`
const geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherKey}`;

const data = useFetch(geoCodeURL);

//get the lat and lon, round to two decimals
const lat = (data[0]?.lat.toFixed(2))
const lon = (data[0]?.lon.toFixed(2))
console.log(`this is lat: ${lat}, this is lon: ${lon}`)







  return (
    <div className="App">
      <header className="App-header">
        <p>weather in {city}</p>
      </header>
      <InputField className = "input-field" placeholder = "enter your city"/>
      <WeatherObject lat = {lat} lon = {lon}/>
      
    </div>
  );
}

export default App;
