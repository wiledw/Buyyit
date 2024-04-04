import { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';
import './Navbar.css'; 

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const logout = () => {
    try {
        axios.get('/logout');
        setUser(null);
        toast.success('Logout Successful');
        navigate('/login')
        
    } catch (error) {
        toast.error('Logout failed');
    }
};


  return (
    <nav className="navbar">
      <div className="nav-items">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/marketplace" className="nav-item">Marketplace</Link>
        <Link to="/academic-services" className="nav-item">Academic Services</Link>
      </div>
      {!user && (
          <div className="navbar-user">
            <Link to="/register" className="nav-item">Register</Link>
            <Link to="/login" className="nav-item">Login</Link>
          </div>
        )}
      {user && (
        <div className="navbar-user">
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/login" className="nav-item" onClick={logout}>Logout</Link>
      </div>
      )}
    </nav>
  );
}

