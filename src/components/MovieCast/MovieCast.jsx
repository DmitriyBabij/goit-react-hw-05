import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            params: { api_key: '593d8d9ef2513a90c5efee2cced8432f' },
          }
        );

        if (response.data.cast.length === 0) {
          setError('Немає інформації про акторський склад.');
        } else {
          setCast(response.data.cast);
        }
      } catch (err) {
        console.error('Помилка при завантаженні акторського складу:', err);
        setError('Не вдалося завантажити акторський склад.');
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Акторський склад</h2>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cast.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            <img
              src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : 'https://via.placeholder.com/100'}
              alt={name}
              width="100"
            />
            <p>{name} - {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;

