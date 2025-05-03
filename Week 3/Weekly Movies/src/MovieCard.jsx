function MovieCard({ title, year, rating, onDelete }) {
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <p>📅 Year: {year}</p>
      <p>⭐ Rating: {rating}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default MovieCard;
