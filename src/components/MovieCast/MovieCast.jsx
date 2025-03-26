import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieCast.module.css';

const API_KEY = 'your_tmdb_api_key';
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
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

