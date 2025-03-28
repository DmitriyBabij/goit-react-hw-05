import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const API_KEY = '593d8d9ef2513a90c5efee2cced8432f';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTNkOGQ5ZWYyNTEzYTkwYzVlZmVlMmNjZWQ4NDMyZiIsIm5iZiI6MTc0MjYyODkyOC4yMTIsInN1YiI6IjY3ZGU2ODQwMWZlZTg3YzFiYzdhOTljMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FnCPxUqbB7pBnClFVmJi_93FqFzxwfHBTgWZL_NCvrU';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      axios
        .get(`${BASE_URL}/search/movie?query=${query}`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        })
        .then(response => setMovies(response.data.results))
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
