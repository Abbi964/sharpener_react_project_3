import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  function deleteMovieHandler(e){
    let id = e.target.parentElement.id;

    props.onDeleteMovie(id)
  }

  return (
    <li id={props.id} className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteMovieHandler}>DELETE</button>
    </li>
  );
};

export default Movie;
