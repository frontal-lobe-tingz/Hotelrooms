import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Changed from <a> to <Link>
import Loader from "../components/Loader";
import Error from '../components/Error';

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL || 
                 process.env.VITE_API_URL || 
                 "https://hotelrooms-backend.onrender.com";

  async function login(e) {
    e.preventDefault(); // Prevent default form submission
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const user = { email, password };

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/api/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.token) {
        // Store only necessary user data
        localStorage.setItem("currentUser", JSON.stringify({
          token: response.data.token,
          name: response.data.name,
          email: response.data.email
        }));
        
        navigate("/home");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Login failed. Please try again.';
      setError(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message={error} />}

          <form onSubmit={login}>
            <div className="bs p-4 shadow-sm">
              <h2 className="mb-4">Login</h2>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mt-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <p className="mt-3 text-center">
                Don't have an account? 
                <Link to="/register" className="ms-1">Register here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
