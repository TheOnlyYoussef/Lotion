import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';


function Layout({notes, addNote, activeNote, setActiveNote}){
    return (
        <div id="layout">
        <header>
        <button onClick={() =>{
            document.getElementById("sidebar-layout").classList.toggle("hidden");
        }}>☰</button>
        <div className = "Middle_header">
        <h1>Lotion</h1>
        <div className='head-desc'>like Notion, but better</div>
        </div>
        </header>
        <div className = "main">
        <div id = "sidebar-layout">
            <Sidebar notes ={notes} 
            addNote = {addNote} 
            activeNote = {activeNote}
            setActiveNote = {setActiveNote}/>
        </div>
        <div className='right'><Outlet/></div>
 
        </div>
        </div>
    
    );
}

export default Layout;