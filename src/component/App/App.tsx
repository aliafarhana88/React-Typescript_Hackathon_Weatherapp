import React from 'react';
import './App.css';
import{useState, useEffect} from "react"
import useFetch from "../../Hook/useFetch"
import InputField from '../InputField/InputField';
import WeatherObject from '../WeatherCard/WeatherCard';
import BackgroundCard from "../BackgroundCard/BackgroundCard"
import bgImg from "../../Images/pexels_binyamin_mellish_108941.jpeg" //default background image saved locally

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

const [cityData, setCityData] = useState<CityDataType>(); //an object containing city's information, fetched from Google Place API
const [city, setCity] = useState("");  //city string, taken from cityData object. this state is used for fetching weather API for specific city. 
const [weather, setWeather] = useState<WeatherObjType>() //weather object is created based on the fetched result of weather API
const [placeID, setPlaceID] = useState<string>("") //placeID of the selected city, will be used for fetching city image from Google Place API
const [placePhotoRef, setPlacePhotoRef] = useState<string>("") //photo reference of the selected city, will be used for fetching city image from Google Place API

function updateCity(newCityData : CityDataType){ //this function is called in InputField component (upon hit enter)
  setCityData(newCityData) //update the city object
  //console.log(`this is city data ${cityData}`)
  //console.log(cityData)
  // let city = newCityData.description; //city string
  // city = filteredCityInput(city);//filter the string for API call
  // setCity(city)   //update the city state
}

//updating the 'city' state insisde useEffect hook, ensuring that 'city' state is updated when 'cityData' state is updated. 
useEffect(()=>{
  if (cityData !== undefined){ //checks to ensure that cityData is not undefined
  
  //update city state
    let city = cityData.description; //city string
  city = filteredCityInput(city);//filter the string for API call
  setCity(city) //update the city state

  //update cityID state
  let place_id = cityData.place_id
  setPlaceID(place_id)
  console.log(placeID)
  }  
}, [cityData, city, placeID])

 
//this function filters the city input so that the city can be recognized by the weather API.
//ie: ensure the string is in format: "city, country_code" (2 words max. remove state/county/region, if present)
//    fill blank spaces with %20. use \s regex that represent single white space. 
function filteredCityInput(city : string){
  const cityInputArr = city.split(","); //split the string into array, separated by comma. 
  if (cityInputArr.length>2){  //check the array length. if there are more than 2 indeces, remove the middle index
    cityInputArr.splice(1,1);
    return cityInputArr.join(",").replace(/\s/, `%20`) //join the array back into a single string. 
  }else{
    return cityInputArr.join(",").replace(/\s/, `%20`)
  }
}

//fetch Weather API
const openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_KEY;
//const geoCodeURL = cityState === ""? undefined :  `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${openWeatherKey}`;

const url = city === "" ? undefined : `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${openWeatherKey}`;

const data = useFetch(url);

//construct weather object from the fetched data inside a useEffect hook to prevent side effects
//weather object will be updated when 'data' changed
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
  //console.log(data)

  
//fetch image of the city from Google Place API ( a 2-step process)

    //step-1 : get the photo ID from from Place API

    //route all requests to the Places API through a proxy server (to remove CORS error)
    //herokuapp only provide temporary access. visit the url below to request for proxy access
    const proxyURL = `https://cors-anywhere.herokuapp.com/`;
    const placeURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&fields=photo&key=${process.env.REACT_APP_PLACES_API_KEY}`;
    
    const placeURL_combined = placeID === "" ? undefined : `${proxyURL}${placeURL}`
    const placeData = useFetch(placeURL_combined)

    useEffect(()=>{
        if(placeData.status === "OK"){
            setPlacePhotoRef (placeData.result.photos[0].photo_reference)
            console.log(`this is photo ID: ${placePhotoRef}`)
        } else {
          setPlacePhotoRef("")
        }
    },[placePhotoRef, placeData])

    //step-2 : get the image URI corresponding to the photo ID from places API
    const imageURI = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${placePhotoRef}&key=${process.env.REACT_APP_PLACES_API_KEY}&maxwidth=400&maxheight=400`;


//dynamically change background image when city is changed
//bgImg is the default background imaged, saved locally in this repo
const imgSrc = placePhotoRef === "" ? bgImg : imageURI;

//get today's date and time
const today = new Date();
let thisDay = today.toDateString();
let thisHour = today.toLocaleTimeString('en-GB', {  hour12: true,
                                                    hour: "numeric", 
                                                    minute: "numeric"}); //get the current hour




  return (
    <div className="App">
      <header className="App-header">
        <p>weather in {weather?.city}, {weather?.country}</p>
        <p>{`${thisDay} ${thisHour}`}</p>
      </header>
      <div className = "background-image" style = {{backgroundImage : `url(${bgImg})`}}>
      <InputField 
        updateCity = {updateCity}
        className = "input-field" placeholder = "enter your city"/>
      <button >get weather</button>
      <WeatherObject weather = {weather} data = {data} />
      <BackgroundCard imgSrc= {imgSrc} className = "background-image"/>
      </div>
    </div>
  );
}



export default App;
