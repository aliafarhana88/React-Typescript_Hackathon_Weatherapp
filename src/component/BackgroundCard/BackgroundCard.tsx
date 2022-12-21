//this file is used to fetch background image from google paces API
//this component takes in the cityData state from the parent component (App)
//renders the background image 
//props: image URL 
import "./BackgroundCard.css"

type BgType = {
    className : string,
    imgSrc : string,
}

export default function BackgroundCard({imgSrc, className}: BgType){
    return(<div className = {className} style = {{backgroundImage : `url(${imgSrc})`}}></div>)
     
}