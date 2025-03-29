import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=593d8d9ef2513a90c5efee2cced8432f`
        );

        setReviews(response.data.results);
      } catch (err) {
        console.error("Помилка при завантаженні рецензій:", err);
      
        setError(
          err.response?.data?.status_message || 
          "Не вдалося завантажити рецензії. Спробуйте пізніше."
        );
      }
    }
      

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Рецензії</h3>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h4>{author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Рецензій поки немає.</p>
      )}
    </div>
  );
};

export default MovieReviews;

