import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import{useState, useEffect} from "react"
import useFetch from "../../Hook/useFetch"

function App() {
//fetch geocode (for latitude and longitude based on location)
//required input: city, country code (stretch goal: make this a dropdown)
//stretch goal: put this useFetch in a hook
const [cityState, setCityState] = useState("");

const openWeatherKey = `93c6846846162e94cd5a1504b5337195`;
const city = `Manchester`
const geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherKey}`;

const data = useFetch(geoCodeURL);


console.log(data[0]?.lat)
console.log(data[0]?.lon)



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
