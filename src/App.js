import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error , setError] = useState(null);
  const [fetchMovies, setFetchMovies] = useState(0)

  useEffect(()=>{
    console.log(fetchMovies)
    //  continusly fething
    if (fetchMovies > 0){
      setTimeout(fetchMoviesHandler,2000)
    }
    
  },[fetchMovies])

  async function fetchMoviesHandler(){
    try{
      setIsLoading(true)
      let response = await fetch('https://swapi.dev/api/film')

      if(!response.ok){
        throw new Error('Something Went wrong...Retrying')
      }

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
    catch(err){
      setError(err.message)
      setFetchMovies(prev => +prev + 1)
    }
    setIsLoading(false)
  }

  function fetchingStopHandler(){
    setFetchMovies(-1)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>{isLoading ? 'Loading...' : 'Fetch Movies'}</button>
      </section>
      <section>
        <MoviesList movies={movies} />
        {!isLoading && error && <div><p>{error}</p><button onClick={fetchingStopHandler}>stop</button></div>}
      </section>
    </React.Fragment>
  );
}

export default App;
