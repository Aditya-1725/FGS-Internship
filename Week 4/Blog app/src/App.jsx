import React, { useState, useEffect, createContext, useContext } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import { fetchPosts, fetchPostById } from './api';
import './App.css';

// Theme Switching context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(prev => !prev);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// App main Enter
export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </Router>
  );
}

// Nav Bar with theme switch button 
function Main() {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <header>
        <h1>Blog App</h1>

        {/* Nav Tabs between Heading and Theme Button */}
        <nav className="nav-tabs">
          <Link to="/" className={location.pathname === '/' ? 'active-tab' : ''}>Home</Link>
          <Link to="/posts" className={location.pathname === '/posts' ? 'active-tab' : ''}>Posts</Link>
        </nav>

        <button onClick={toggleTheme}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

//  Home TAB edits
function Home() {
  return (
    <div className="home">
      <h2>Welcome to the Blog App!</h2>
      <p>Click on the "Posts" tab to browse all blog articles.</p>
    </div>
  );
}

// List of Posts from api
function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchPosts(50); // Fetch 50 posts
      setPosts(postData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
              <h2>{post.title}</h2>
              <p>{post.body.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Post Detailed View
function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchPostDetails();
  }, [id]);

  if (!post) return <p>Loading post details...</p>;

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => navigate('/posts')}>← Back to Posts</button>
    </div>
  );
}
