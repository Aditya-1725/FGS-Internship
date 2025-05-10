function BookCard({ book, onDelete }) {
  return (
    <div className="book-card">
      <h3 className="book-title">{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <button className="delete-btn" onClick={onDelete}>Delete</button>
    </div>
  );
}

export default BookCard;
