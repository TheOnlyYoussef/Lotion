import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function View({notes, deleteNote}) {
    const Navigate = useNavigate();
    const {Noteid} = useParams();

    function createMarkup(){
        return {__html: note.body};
    }

    const handleEditClick = () => {
        Navigate(`/${Noteid}/edit`);
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
    if (note === undefined){
        return(<></>);

    }
    return(  
    <div className='note-view'>
    <div className='note-view-header'>
    <div className='title'>
    < p id='title'>{note.title}</p>
    <p>{note.date}</p>
    </div>
    <button onClick={() => {handleEditClick()}}>Edit</button>
    <button onClick={() => {handleDeleteClick()}}>Delete</button>
    </div>
    <p id='note_view' dangerouslySetInnerHTML={createMarkup()}></p>
</div>);

}
export default View;