import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';

// ===== Theme Context =====
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

// ===== App Entry Point =====
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </BrowserRouter>
  );
}

// ===== Main Layout with Routing =====
function Main() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <header>
        <h1>User Dashboard</h1>
        <button onClick={toggleTheme}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

// ===== User List Component =====
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="user-list">
          <h2>User List</h2>
          <ul>
            {users.map(user => (
              <li key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ===== User Detail Component =====
function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}
