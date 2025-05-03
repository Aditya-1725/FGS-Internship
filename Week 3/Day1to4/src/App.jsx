import { useState } from 'react';
import './App.css';
import Card from './card.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const cardData = [
    { title: "React", description: "A JavaScript library for building UIs." },
    { title: "Vite", description: "Next generation frontend tool." },
    { title: "Props", description: "Props let you pass data to components." }
  ];

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={isDark ? 'dark-theme' : 'light-theme'}>
      <header className='navtabs'>
        <h2>My React App</h2>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      <h1>Hello React. My name is Aditya</h1>

      <section>
        <h1>⇒ Learning Props and Rendering Lists</h1>
        <div className="card-container">
          {cardData.map((item, index) => (
            <Card key={index} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <div className="like-section">
        <button onClick={() => setCount(count + 1)} className="like-btn">
          ❤️ Like ({count})
        </button>
      </div>

      <footer className='navtabs'>
        <p>Copyright © 2025 by Aditya</p>
      </footer>
    </div>
  );
}

export default App;
