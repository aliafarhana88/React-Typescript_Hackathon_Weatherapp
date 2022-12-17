import useFetch from "../../Hook/useFetch"
import {useState, useEffect} from "react"



type inputType = {
    className ?: string;
    placeholder ?: string;
}


export default function InputField(prop : inputType){
    const [event, setEvent ] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [citySuggestion, setcitySuggestion] = useState<object[]>([])

    //route all requests to the Places API through a proxy server (to remove CORS error)
    //herokuapp only provide temporary access. visit the url below to request for proxy access
    const proxyURL = `https://cors-anywhere.herokuapp.com/`;
    const placesURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${process.env.REACT_APP_PLACES_API_KEY}`;

    const url = event === "" ? undefined : `${proxyURL}${placesURL}`;
    
    
    const data = useFetch(url);

    //console.log(data?.predictions)

    //use time delay to call places API to prevent rate-limit or error 429 (too many requests)
    useEffect(() => {
        const timeOutId = setTimeout(() => setCity(event), 1000);
        return () => clearTimeout(timeOutId);
      }, [event, city]);
    
    //function that updates the state city onChange
    function onChange(e:React.ChangeEvent<HTMLInputElement>){ 
    
    setEvent(e.target.value)
    setcitySuggestion(data?.predictions)
    
    }

    //console.log(`this is citysuggestion ${citySuggestion}`)

    const {className, placeholder} = prop
    return (
        <div>
        <>
        <input list = "cities" onChange = {onChange} className = {className} placeholder= {placeholder}/>
        <datalist id = "cities">
            {citySuggestion?.map((obj: any)=>{
            return  <option value = {obj.description} />
            })};
        </datalist>
        </>
        </div>
    )
}