import React, { useRef } from "react";
import classes from './MovieForm.module.css'

function MovieForm(props){
    // using refs for values
    let titleInputRef = useRef()
    let openingTextInputRef = useRef()
    let dateInputRef = useRef()

    function formSubmitHandler(e){
        e.preventDefault()
        let movieObj = {
            title : titleInputRef.current.value,
            openingText : openingTextInputRef.current.value,
            releseDate : dateInputRef.current.value
        }

        props.onAddMovie(movieObj)
        // clearing inputs
        titleInputRef.current.value = '';
        openingTextInputRef.current.value = '';
        dateInputRef.current.value = '';
    }

    return (
        <form className={classes.form}>
            <label htmlFor="title">Title</label><br/>
            <input type="text" id="title" ref={titleInputRef}/><br/>
            <label htmlFor="textArea">Opening Text</label><br/>
            <textarea id="textArea" rows={4} ref={openingTextInputRef}/><br/>
            <label htmlFor="date">Relese Date</label><br/>
            <input id="date" type="date" ref={dateInputRef}/><br/>
            <button className="button" onClick={formSubmitHandler}>Add Movie</button>
        </form>
    )
}

export default MovieForm;