
type list = {
    text : string;
    handleClick ?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>)=> void
}
export default function ListItem(prop:list){
    const {text, handleClick} = prop
    return(
        <li onClick = {handleClick}>{text}</li>
    )
}