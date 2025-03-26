import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const API_KEY = 'your_tmdb_api_key';
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then(response => {
        setMovie(response.data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details. Please try again later.'); 
      });
  }, [movieId]);

  if (error) {
    return <div>{error}</div>; 
  }

  if (!movie) return <div>Loading...</div>; 

  return (
    <div>
    
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>Go back</button>

      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      <MovieCast movieId={movieId} />
      <MovieReviews movieId={movieId} />
    </div>
  );
}

export default MovieDetailsPage;

