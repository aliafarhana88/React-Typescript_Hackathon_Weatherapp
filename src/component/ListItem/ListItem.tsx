
type list = {
    text : string;
}
export default function ListItem(prop:list){
    const {text} = prop
    return(
        <li>{text}</li>
    )
}