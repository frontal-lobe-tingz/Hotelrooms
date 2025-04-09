// client/src/screens/Loginscreen.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const login = async (e) => {
    e.preventDefault();

    // Basic client‑side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // POST to your backend
      const response = await axios.post(
        `${API_URL}/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // ANY 2xx is a success
      if (response.status >= 200 && response.status < 300) {
        // save the entire user object (no token yet)
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        // navigate to home
        navigate("/home");
      }
    } catch (err) {
      // prefer backend message, then generic
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setError(msg);
      console.error("Login error:", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message={error} onClose={() => setError(null)} />}

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
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="mt-3 text-center">
                Don't have an account?
                <Link to="/register" className="ms-1">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
