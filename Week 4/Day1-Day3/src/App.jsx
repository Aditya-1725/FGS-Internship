import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Day 3 task for Custom Hooks 
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading };
};

// Day 1 task for Navigation of Pages 
function Home() {
  const { data: posts, loading } = useFetch('https://jsonplaceholder.typicode.com/posts'); // useFetch Custom hook api passing

  return (
    <div>
      <h2>Home - Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.slice(0, 20).map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// About Page
function About() {
  return (
    <div>
      <h2>About Page</h2>
      <p>This is a simple multi-page app using React Router.</p>
    </div>
  );
}

// Contact Page
function Contact() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Contact Page</h2>
      <p>Feel free to contact us for more info.</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

//  All Components mixed together Day 2 Routes to pages
export default function App() {
  return ( 
    <BrowserRouter> // Enables Routing to pages 
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link> // Nav Bar elements list
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> // Navigation list onclick we can go to particular page
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
