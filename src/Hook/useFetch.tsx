import {useState, useEffect } from "react"

// type FetchType = {
//     url : string
//     dependencies ?: any
// }

//this is a custom hook that fetches an API
function useFetch(url:string){

    //initialize the data
    const [data, setData] = useState<any[]>([]);

    //initialize error
    //const [error, setError] = useState(null);


    useEffect(()=> {
        
        //define async function for fetch API
        async function fetchAPI(){
        const response = await fetch(url)
        const fetcheddata = await response.json()
        setData(fetcheddata)
       
        }

        //call the function fetchAPI
        fetchAPI()
    },[url])

    // if (error){
    //     console.log(error);
    //     console.log(data);
    //     return<p>Error! Inspect console</p>
    // }
   // console.log(data);
    return data
   
}

export default useFetch;

