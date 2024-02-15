import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {

  function onDeleteMovieHandler(id){
    props.onDeleteMovie(id)
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          onDeleteMovie={onDeleteMovieHandler}
          id={movie.id}
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default React.memo(MovieList) ;
