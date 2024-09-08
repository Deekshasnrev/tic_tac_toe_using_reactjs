import { useState } from "react"
export default function Player({name,symbol,isActive,onChangeName}) {
    const [changedName,setChangedName] = useState(name);
    const [isEditing,setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if(isEditing){
        onChangeName(symbol,playerName)
        }
    }
    function handleChange(event) {
        setChangedName(event.target.value)
    }
    let playerName = <span className="player-name">{changedName}</span>;
    let buttonValue = 'Edit'
    if(isEditing) {
        playerName = <input type="text" required value={changedName} onChange={handleChange}/>;
        buttonValue = 'Save'
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick} >{buttonValue}</button>
        </li>
    )
}