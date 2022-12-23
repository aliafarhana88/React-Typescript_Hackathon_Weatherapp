import useFetch from "../../Hook/useFetch"
import React, {useState, useEffect} from "react"
import ListItem from "../ListItem/ListItem"
import "./InputField.css"



type inputType = {
    className ?: string;
    placeholder ?: string;
    handleClick ?: (e: React.MouseEvent<HTMLElement, MouseEvent>)=>void
    updateCity ?: (obj : any)=>void
}



export default function InputField(prop : inputType){
    const {className, placeholder, updateCity} = prop

    const [event, setEvent ] = useState<string>(""); //will be update when the input field is changed (onChange)
    const [city, setCity] = useState<string>(""); //city is the typed city in the input field (updated with 'event' state)
    const [citySuggestion, setcitySuggestion] = useState<any[]>([]) //array of city suggestion


    //route all requests to the Places API through a proxy server (to remove CORS error)
    //herokuapp only provide temporary access. visit the url below to request for proxy access
    const proxyURL = `https://cors-anywhere.herokuapp.com/`;
    const placesURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${process.env.REACT_APP_PLACES_API_KEY}`;

    const url = city === "" ? undefined : `${proxyURL}${placesURL}`;
    
    //fetch city suggestion
    const data = useFetch(url); 
    //console.log(data?.predictions[0])

    

    //function that updates the state city onChange (with delay)
    //use time delay to call places API to prevent rate-limit or error 429 (too many requests)
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setCity(event); 
            setcitySuggestion(data?.predictions)}, 500); 
        return () => clearTimeout(timeOutId);
      }, [event, city, data]);
    
    //function that captures the input text onChange
    function onChange(e:React.ChangeEvent<HTMLInputElement>){ 
    setEvent(e.target.value)
    }

    
    function handleChange(e: React.KeyboardEvent<HTMLInputElement>){

        //set the city state according to the input value when Enter button is pressed. 
        if (e.key === "Enter"){
          const cityInput = (e.target as HTMLInputElement).value //the raw input by user
            //if city suggestion exist, get the first object from citysuggestion
            if (cityInput !== citySuggestion[0].description){
                updateCity?.(citySuggestion[0]);
                console.log(`citydata updated1`)
                console.log(citySuggestion[0])
            } else {
                //find index of the selected city
                const index = citySuggestion.findIndex(city => city.description === cityInput);
                updateCity?.(citySuggestion[index])
                console.log(`city data updated2`)
                console.log(citySuggestion[index])

            }
            //console.log(`city data is not updated`)

          //setCityState(rawCityInput)    
            //setCity(filteredCityInput(cityState));
              
          
            }
            
          }    

    console.log(`this is citysuggestion ${citySuggestion}`)
    console.log(citySuggestion)

    
    return (
        <div className = "div">
        <>
        <input list = "cities" onChange = {onChange} onKeyPress = {handleChange} className = {className} placeholder= {placeholder}/>
        {/* {citySuggestion?.map((obj : any)=>{
          return  <ListItem key = {obj.description} text = {obj.description} handleClick = {handleClick}/>
        })} */}
        <datalist className = "data-list" id = "cities">
            {citySuggestion?.map((obj: any)=>{
            return  <option key={obj.description} value = {obj.description} />
            })};
        </datalist>
        </>
        </div>
    )
}