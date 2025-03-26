import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDQ2OGU3YWQxY2Y0MTA0MGRmZTc3ZTkyNzRhMWUyYyIsIm5iZiI6MTc0MjM5NTgyNi43NjQ5OTk5LCJzdWIiOiI2N2RhZDliMmIwNWM4YTM4MGZhMWZmMjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IvQ4Uk4mogkBAA_ow7Ivu_CCkoj3GigESyzMMwoPKnE';;
const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/trending/movie/day`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
