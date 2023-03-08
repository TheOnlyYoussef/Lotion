import React, { useEffect } from "react";
import uuid from "react-uuid";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Edit from "./edit";
import View from "./view";
import Start from "./Start";

function App() {
  //const navigate = useNavigate();
  const [notes, setNotes] = React.useState(localStorage.notes ? JSON.parse(localStorage.notes ): []);
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
  const addNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
      date: formatDate(new Date()),
    };
    setNotes([ ...notes, newNote]);
  };
  React.useEffect(() => {localStorage.setItem("notes", JSON.stringify(notes))}, [notes]);


  const deleteNote = (id) => {
   
    const noteElement = document.getElementById(id);
    noteElement.style.backgroundColor = ""; noteElement.style.color = ""
    setNotes(notes.filter((note) => note.id !== id));
    setActiveNote(null);
    
  };

  const [activeNote, setActiveNote] = React.useState(null);
  //useEffect(() => {activeNote !== null? navigate(`/${activeNote}`): navigate(`/`)}, [activeNote]);

  


  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Layout 
      notes = {notes} 
      addNote = {addNote}
      activeNote = {activeNote}
      setActiveNote = {setActiveNote}
      />}>
        <Route path="/" element={<Start /> } />
        <Route path=":Noteid/edit" element={<Edit notes = {notes} deleteNote = {deleteNote} setNotes ={setNotes}/>} />
        <Route path=":Noteid" element={<View notes = {notes} deleteNote = {deleteNote} />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;