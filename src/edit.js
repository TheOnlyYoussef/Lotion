import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function Edit({notes, deleteNote, setNotes}) {
    const Navigate = useNavigate();
    const {Noteid} = useParams();

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    const formatDate = (when) => {
        const formatted = when.toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };
    const [date, setdate] = useState(new Date().toISOString().slice(0,19));
    const handleDateChange = (e) => {
        setdate(e.target.value);
        note.date = formatDate(new Date(e.target.value));
        
    };



    const handleSaveClick = () => {
         setNotes([...notes.slice(0, Noteid), ...notes.slice(Noteid+1, notes.length)]);
        //update the note at Noteid to be the new note
        // [...notes.slice(0, Noteid), note, ...notes.slice(Noteid+1)]
        Navigate(`/${Noteid}`);
    };

    const handleDeleteClick = () => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
        deleteNote(Noteid);
        Navigate(`/`);
        }
    };
    
    const note = notes.find((note) => note.id === Noteid);
    useEffect(() => {note === undefined? Navigate(`/`):console.log("note found");}, [Noteid]);
    console.log(note);

    const [bodyValue, setbodyValue] = useState(note.body);
    const [titleValue, settitleValue] = useState(note.title);
    
    useEffect(() => {note.title =titleValue}, [titleValue]);
    useEffect(() => {note.body = bodyValue}, [bodyValue]);

    if (note === undefined){
        return(<></>);
    }
    return (
            <div className='note-edit'>
                <div className='note-edit-header'>
                <div className='title'>
                <input type='text' id='title' autoFocus value={titleValue} onChange = {(e) =>{settitleValue(e.target.value)}}/>
                <input type="datetime-local" value={date} onChange = {(e) => handleDateChange(e)}/>
                </div>
                <button onClick={() => {handleSaveClick()}}>Save</button>
                <button onClick={() => {handleDeleteClick();}}>Delete</button>
                </div>
                <ReactQuill id='The_note' placeholder='Type your notes here' theme="snow" value={bodyValue} onChange = {setbodyValue}/>
            </div>
    );
}

export default Edit;