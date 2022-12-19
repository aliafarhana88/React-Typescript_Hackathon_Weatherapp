import useFetch from "../../Hook/useFetch"
import React, {useState, useEffect} from "react"
import ListItem from "../ListItem/ListItem"



type inputType = {
    className ?: string;
    placeholder ?: string;
    handleChange ?: (e: React.KeyboardEvent<HTMLInputElement>)=>void
    handleClick ?: (e: React.MouseEvent<HTMLElement, MouseEvent>)=>void
}


export default function InputField(prop : inputType){
    const [event, setEvent ] = useState<string>("");
    const [city, setCity] = useState<string>(""); //city is the typed city in the input field
    const [citySuggestion, setcitySuggestion] = useState<any[]>([]) //array of city suggestion
    const [selectedCityid, setCityID] = useState<string>("") //reference ID of the selected city
    const [placesPhotoID, setPlacesPhotoID] = useState<string>("") //ID of the selected city

    //route all requests to the Places API through a proxy server (to remove CORS error)
    //herokuapp only provide temporary access. visit the url below to request for proxy access
    const proxyURL = `https://cors-anywhere.herokuapp.com/`;
    const placesURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${process.env.REACT_APP_PLACES_API_KEY}`;

    const url = city === "" ? undefined : `${proxyURL}${placesURL}`;
    
    
    const data = useFetch(url); //fetch city suggestion

    //fetch image of the city ( a 2-step process)

    const selectedCityURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${selectedCityid}&fields=photo&key=${process.env.REACT_APP_PLACES_API_KEY}`;
    
    const selectedCityURL_combined = selectedCityid === "" ? undefined : `${proxyURL}${selectedCityURL}`
    const selectedCityData = useFetch(selectedCityURL_combined)

    useEffect(()=>{
        if(selectedCityData.status === "OK"){
            setPlacesPhotoID (selectedCityData.result.photos[0].photo_reference)
            console.log(placesPhotoID)
        }
    },[placesPhotoID, selectedCityData])
   
    
    // const photoURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placesPhotoID}&fields=photo&key=${process.env.REACT_APP_PLACES_API_KEY}`;
    // const photoURL_combined = placesPhotoID === "" ? undefined : `${proxyURL}${photoURL}`;

    // const cityPhoto = useFetch(photoURL_combined)
    // console.log(cityPhoto)

    //console.log(selectedCityData.status)
    //console.log(data)

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

    function handleClick(e : React.MouseEvent<HTMLElement, MouseEvent>){
        //setCityState((e.target as HTMLInputElement).value)
        const selectedCity = (e.target as HTMLElement).innerText
        console.log(selectedCity)

        //get the index of the object, and then get the object 
        const index = citySuggestion.findIndex(city=> city.description === selectedCity)
        
        const places_id = citySuggestion[index].place_id
        setCityID(places_id)
        console.log(selectedCityid)

        }
    

    console.log(`this is citysuggestion ${citySuggestion}`)
    console.log(citySuggestion)

    const {className, placeholder, handleChange} = prop
    return (
        <div>
        <>
        <input list = "cities" onChange = {onChange} onKeyPress = {handleChange} className = {className} placeholder= {placeholder}/>
        {citySuggestion?.map((obj : any)=>{
          return  <ListItem key = {obj.description} text = {obj.description} handleClick = {handleClick}/>
        })}
        {/* <datalist id = "cities">
            {citySuggestion?.map((obj: any)=>{
            return  <option key={obj.description} value = {obj.description} />
            })};
        </datalist> */}
        </>
        </div>
    )
}