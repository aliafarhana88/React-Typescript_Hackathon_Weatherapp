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

interface CityDataType  {
  description : string,
  matched_substrings: object[],
  place_id : string,
  reference : string,
  structured_formatting : {},
  terms : object[],
  types : []
}

function App() {

const [cityData, setCityData] = useState<CityDataType>(); //an object containing city's information, fetched from place API
//const [cityState, setCityState] = useState(""); // remove this later. will have replace with cityobject
const [city, setCity] = useState("");  //change this to city object. updated based on suggested city (in the inputField component)
const [weather, setWeather] = useState<WeatherObjType>()

function updateCity(newCityData : CityDataType){ //this function is called in InputField component (upon hit enter)
  setCityData(newCityData) //update the city object
  console.log(`this is city data ${cityData}`)
  console.log(cityData)
  let city = newCityData.description; //city string
  city = filteredCityInput(city);//filter the string for API call
  setCity(city)   //update the city state
}



 
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



//console.log(city)
//let city = cityData?.description;

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
      <InputField 
        updateCity = {updateCity}
        // handleChange = {handleChange} 
        className = "input-field" placeholder = "enter your city"/>
      <button >get weather</button>
      <WeatherObject weather = {weather} data = {data} />
      
    </div>
  );
}



export default App;
