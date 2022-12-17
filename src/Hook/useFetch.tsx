import {useState, useEffect } from "react"

// type FetchType = {
//     url : string
//     dependencies ?: any
// }

//this is a custom hook that fetches an API
function useFetch(url:string | undefined){

    //initialize the data
    const [data, setData] = useState<any>("");

    //initialize error
    //const [error, setError] = useState(null);


    useEffect(()=> {
        console.log(`this is the fetch url : ${url}`)
        //if undefined url is being passed, do not fetch
        //this does not work at the moment somehow
        if(url === undefined){
            console.log("not fetching. undefined URL")
            return;
        } 
        
        //define async function for fetch API
        async function fetchAPI(){
        try {const response = await fetch(url!, { //adding a non-null assertion (ie: url will never be null or undefined)
            method: 'GET',
            headers: { Accept: "application/json"},
          }) 

          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }

        const fetcheddata = await response.json()
        setData(fetcheddata)

        } catch (err) {
            console.log(err);
          }
       
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

