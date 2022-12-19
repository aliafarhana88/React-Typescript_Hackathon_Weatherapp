import {useState, useEffect } from "react"

// type FetchType = {
//     url : string
//     dependencies ?: any
// }

//this is a custom hook that fetches an API
function useFetch(url:string | undefined){

    //initialize the data
    const [data, setData] = useState<any>("");
    const [error, setError] = useState<any>(null);

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
        try {
          const response = await fetch(url!, { //added a non-null assertion (ie: url will never be null or undefined)
            method: 'GET',
            headers: { Accept: "application/json"},
          })
          //.then((res)=>res.json())
          //.then((fetchedData)=>setData(fetchedData)) 
          //.catch((err)=>setError(err))

        //   if (response.status !== 200){
        //     console.log(error);
        //     console.log(data);
        //     return false   //if there is error, data is not being updated. 
        //   } else {
        //   setData(response)
        //   return true //only update the data when there is no error
        // }
          
          if (!response.ok) {
            //throw new Error(`Error! status: ${response.status}`);
            console.log(error);
            console.log(data);
            return  false    //if there is error, data is not being updated. 
          } else {
            const fetcheddata = await response.json()
            setData(fetcheddata)
            //setData(response)
            return true //only update the data when there is no error
          }


       // const fetcheddata = await response.json()
        //setData(fetcheddata)

          } catch (err) {
            setError(err);
          }
       
        }

        //call the function fetchAPI
        fetchAPI()
    },[url])

    if (error){
        console.log(error);
        console.log(data);
        return //return without data
    }
   // console.log(data);
    return data
   
}

export default useFetch;

