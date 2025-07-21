import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/register`;
      const result = await axios.post(url, user);
      setSuccess("Successfully registered!");
      setError("");

      setTimeout(() => {
        Navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="App-Register-Row">
      <div className="register-card">
        <h2>Registration Form</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          placeholder="Enter first name"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter last name"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={handleSubmit}>Register</button>
        <hr />
        <div className="nav">
          <Link to="/login">Already a member? Login Here...</Link>
        </div>
      </div>
    </div>
  );
}
