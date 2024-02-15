import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  async function fetchMoviesHandler(){
    setIsLoading(true)
    let response = await fetch('https://swapi.dev/api/films')
    let responseObj = await response.json()
    setIsLoading(false)
    let movies = responseObj.results.map((movie)=>{
      return {
        id : movie.episode_id,
        title : movie.title,
        openingText : movie.opening_crawl,
        releseDate : movie.relese_date
      }
    })

    setMovies(movies)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>{isLoading ? 'Loading...' : 'Fetch Movies'}</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
