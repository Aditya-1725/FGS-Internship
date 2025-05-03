import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [newMovie, setNewMovie] = useState({ title: '', year: '', rating: '' });

  // Fetch movies based on the search query
  const fetchMovies = async (query) => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=75fe6799&s=${query}&type=movie`);
      const data = await res.json();

      if (data.Search) {
        // Fetch full details (including rating) for each movie
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=75fe6799&i=${movie.imdbID}`);
            return await res.json();
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setMovies([]);
    }
  };

  const fetchDefaultMovies = async () => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=75fe6799&s=Ben+10&type=movie`);
      const data = await res.json();
      if (data.Search) {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=75fe6799&i=${movie.imdbID}`);
            return await res.json();
          })
        );
        setMovies(detailedMovies);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching default movies:', error);
      setMovies([]);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      fetchMovies(search.trim());
    }
  };

  const handleDelete = (title) => {
    const updated = movies.filter((movie) => movie.Title !== title);
    setMovies(updated);
  };

  const handleNewMovieChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleAddMovie = () => {
    const { title, year, rating } = newMovie;
    if (title && year && rating) {
      const newEntry = {
        Title: title,
        Year: year,
        imdbRating: rating,
      };
      setMovies([newEntry, ...movies]);
      setNewMovie({ title: '', year: '', rating: '' });
    }
  };

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Movie4 you</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search for a movie..."
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <div className="add-movie-form">
        <h2>Add Movie</h2>
        <input
          type="text"
          name="title"
          value={newMovie.title}
          onChange={handleNewMovieChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="year"
          value={newMovie.year}
          onChange={handleNewMovieChange}
          placeholder="Year"
        />
        <input
          type="text"
          name="rating"
          value={newMovie.rating}
          onChange={handleNewMovieChange}
          placeholder="Rating"
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.Title}
              year={movie.Year}
              rating={movie.imdbRating || 'N/A'}
              onDelete={() => handleDelete(movie.Title)}
            />
          ))
        ) : (
          <p className="no-results">No movies found. Try searching above!</p>
        )}
      </div>
    </div>
  );
}

export default App;
