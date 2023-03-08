import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";

function Sidebar({notes, addNote, activeNote, setActiveNote}){
    const donothing = () => {};
    const Navigate = useNavigate();
    const {Noteid} = useParams();
    Noteid === undefined? donothing(): setActiveNote(Noteid)
   
    function createMarkup(note){
      return {__html: note.body.substr(0, 50) + "..."};
  }
    function handleLinkClick(id) {
      setWhite(activeNote);
      Navigate(`/${id}`);
      setActiveNote(id);

      }
      const noteElement = document.getElementById(Noteid);
      const blue = () =>{noteElement.style.backgroundColor = "#0084ff"; noteElement.style.color= "White"}
      const setBlue = (Note) => { activeNote !== null? blue():donothing()};
      const white = () => {noteElement.style.backgroundColor = ""; noteElement.style.color = ""};
      const setWhite = (Note) => { activeNote !== null? white():donothing()};

      useEffect(() => {setBlue(activeNote)}, [activeNote]);




    return (
        <>
        <div className = "sidebar">
        <div className = "sidebar-header">
        <h1>Notes</h1>
        <button onClick={() => {addNote();} }>+</button>
        </div>
        <div className = "sidebar-content">
        {notes.length === 0 && <div id = "no-notes">No notes yet</div>}
        
        {notes.map((note) => {
            const colour = (note.id === Noteid? "#0084ff":"defult");
            return( 
            

        <div className= "sidebar-item" id = {note.id} onClick={() => {handleLinkClick(note.id);} }  >
        <div className = "sidebar-item-title"><h2>{note.title}</h2></div>
        <div className = "sidebar-item-date">{note.date}</div>
        <p dangerouslySetInnerHTML={createMarkup(note)}></p>
         </div>

         )})}
       

         </div>

        </div>
        </>
        )
}

export default Sidebar;