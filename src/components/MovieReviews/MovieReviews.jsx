import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const API_KEY = 'your_tmdb_api_key';
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then(response => setReviews(response.data.results))
      .catch(error => {
        console.error('Error fetching movie reviews:', error);
        setError('Failed to load reviews. Please try again later.');
      });
  }, [movieId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.reviews}>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieReviews;