import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from '../components/Error';


function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function login() {
    const user = { email, password };
  
    try {
      setLoading(true);
      const response = await axios.post("https://hotelrooms-backend.onrender.comapi/user/login", user);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      setLoading(false);
      navigate("/home");
    } catch (err) {
      console.error("Error during login:", err);
      setLoading(false);
      setError(true);
    }
  }
  
  return (
    <div>
      {loading && (<Loader/>)}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
      {error && (<Error message ='Invalid Credentials'/>)}   

          <div className="bs">
            <h2>Login</h2>

            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary mt-2" onClick={login}>
              Login
            </button>

            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
