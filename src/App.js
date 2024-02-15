import React, { useCallback, useEffect, useMemo, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error , setError] = useState(null);
  const [fetchMovies, setFetchMovies] = useState(0)

  const fetchMoviesHandler = useCallback(async()=>{
    try{
      setIsLoading(true)
      let response = await fetch('https://sharpener-project-3-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')

      if(!response.ok){
        throw new Error('Something Went wrong...Retrying')
      }

      let responseObj = await response.json()
      
      let loadedMovies = [];

      for (let key in responseObj){
        loadedMovies.push({
          id : key,
          title : responseObj[key].title,
          openingText : responseObj[key].openingText,
          releseDate : responseObj[key].releseDate,
        })
      }

      setIsLoading(false)
  
      setMovies(loadedMovies)
    }
    catch(err){
      setError(err.message)
      setFetchMovies(prev => +prev + 1)
    }
    setIsLoading(false)
  },[])
  
  // using use effect for loading data on first reload
  // useEffect(()=>{
  //   fetchMoviesHandler()
  // },[fetchMoviesHandler])

  // using useEffect for contiously fetching movies
  useEffect(()=>{
    console.log(fetchMovies)
    //  continusly fething
    if (fetchMovies > 0){
      setTimeout(fetchMoviesHandler,2000)
    }  
  },[fetchMovies,fetchMoviesHandler])

  function fetchingStopHandler(){
    setFetchMovies(-1)
  }

  // using useMemo to store movieList
  let movieList = useMemo(()=>{
    return movies
  },[movies])


  async function addMovieHandler(movieObj){
    const response = await fetch('https://sharpener-project-3-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',{
      method : 'POST',
      body : JSON.stringify(movieObj),
      headers : {
        'content-Type' : 'application/json'
      }
    })
    let data = await response.json();
    console.log(data)
  }

  const onDeleteMovieHandler = useCallback(async(id)=>{
    await fetch(`https://sharpener-project-3-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,{
      method : 'DELETE',
      headers : {
        'content-Type' : 'application/json'
      }
    })
    
    fetchMoviesHandler()
  },[fetchMoviesHandler])

  return (
    <React.Fragment>
      <MovieForm onAddMovie={addMovieHandler}/>
      <section>
        <button onClick={fetchMoviesHandler}>{isLoading ? 'Loading...' : 'Fetch Movies'}</button>
      </section>
      <section>
        <MoviesList onDeleteMovie={onDeleteMovieHandler} movies={movieList} />
        {!isLoading && error && <div><p>{error}</p><button onClick={fetchingStopHandler}>stop</button></div>}
      </section>
    </React.Fragment>
  );
}

export default App;
