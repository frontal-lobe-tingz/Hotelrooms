import React, { useState } from "react";
import axios from "axios";

function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // CRA environment variable
  const API_URL = process.env.REACT_APP_API_URL || "https://hotelrooms-backend.onrender.com";

  const register = async () => {
    const user = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(`${API_URL}/api/users/register`, user);
      alert("Registration successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration: " + error.message);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary mt-3" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Registerscreen;
