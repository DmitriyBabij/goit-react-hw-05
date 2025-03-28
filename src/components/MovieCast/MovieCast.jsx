import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieCast.module.css';

const API_KEY = '593d8d9ef2513a90c5efee2cced8432f';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTNkOGQ5ZWYyNTEzYTkwYzVlZmVlMmNjZWQ4NDMyZiIsIm5iZiI6MTc0MjYyODkyOC4yMTIsInN1YiI6IjY3ZGU2ODQwMWZlZTg3YzFiYzdhOTljMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FnCPxUqbB7pBnClFVmJi_93FqFzxwfHBTgWZL_NCvrU';

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      })
      .then(response => setCast(response.data.cast))
      .catch(error => {
        console.error('Error fetching movie cast:', error);
        setError('Failed to load cast information. Please try again later.');
      });
  }, [movieId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImage}
              />
            ) : (
              <span>No image available</span>
            )}
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;

