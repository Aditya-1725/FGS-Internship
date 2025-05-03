function Card({ title, description }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>
    </div>
  );
}

export default Card;
