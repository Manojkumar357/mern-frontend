import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState(user || {});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Fetch user profile if needed
  useEffect(() => {
    if (user?._id) {
      setForm(user); // fill form with existing user info
    }
  }, [user]);

  const logout = () => {
    setUser({});
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  if (!user?._id) {
    setError("User ID is missing. Please log in again.");
    return;
  }

  try {
    const url = `${API_URL}/api/users/${user._id}/profile`;
    const token = localStorage.getItem("token");

    const response = await axios.patch(url, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(response.data);
    setMessage("Profile updated successfully.");
    setError("");
  } catch (err) {
    console.error(err);
    setError("Something went wrong while updating.");
    setMessage("");
  }
};



  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-left">
          <img
            src="/images/Profile.jpg"
            alt="Profile"
            className="profile-image"
          />
          <h3 className="profile-name">
            {user?.firstName ? `Welcome, ${user.firstName}` : "Welcome!"}
          </h3>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="profile-right">
          <h2>My Profile</h2>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName || ""}
            onChange={handleChange}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName || ""}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email || ""}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password || ""}
            onChange={handleChange}
          />
          <button className="update-btn" onClick={handleSubmit}>
            Update Profile
          </button>
          {message && <p className="error-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>
    </div>
  );
}
