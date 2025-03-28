import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const API_KEY = '593d8d9ef2513a90c5efee2cced8432f';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTNkOGQ5ZWYyNTEzYTkwYzVlZmVlMmNjZWQ4NDMyZiIsIm5iZiI6MTc0MjYyODkyOC4yMTIsInN1YiI6IjY3ZGU2ODQwMWZlZTg3YzFiYzdhOTljMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FnCPxUqbB7pBnClFVmJi_93FqFzxwfHBTgWZL_NCvrU';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
