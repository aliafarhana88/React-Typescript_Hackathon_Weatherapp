//this file is used to fetch background image from google paces API
//this component takes in the cityData state from the parent component (App)
//renders the background image 
//props: image URL 

type BgType = {
    imgSrc : string,
    altTxt: string
}

export default function BackgroundCard({imgSrc, altTxt}: BgType){
    return(<img src = {imgSrc} alt = {altTxt} />)
}