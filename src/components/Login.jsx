import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "./Login.css"; // custom CSS

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);

      // Show temporary success message
      setSuccess("You have successfully logged in!");
      setTimeout(() => {
        setSuccess("");
        Navigate("/");
      }, 2000); // Show for 2 seconds
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <input
          type="text"
          placeholder="Email Address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={handleSubmit}>Login</button>
        <hr />
       <Link to="/register">Not a user then Create Account</Link>
      </div>
    </div>
  );
}


















// import React, { useContext } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { AppContext } from "../App";
// export default function Login() {
//   const {user, setUser} = useContext(AppContext);
//   const [error, setError] = useState();
//   const Navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL;
//   const handleSubmit = async () => {
//     try {
//       const url = `${API_URL}/api/users/login`;
//       const result = await axios.post(url, user);
//       setUser(result.data);
//       Navigate("/");
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };
//   return (
//     <div>
//       <h2>Login</h2>
//       {error}
//       <p>
//         <input
//           type="text"
//           placeholder="Email Address"
//           onChange={(e) => setUser({ ...user, email: e.target.value })}
//         />
//       </p>
//       <p>
//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setUser({ ...user, password: e.target.value })}
//         />
//       </p>
//       <p>
//         <button onClick={handleSubmit}>Submit</button>
//       </p>
//       <hr />
//       <Link to="/register">Create Account</Link>
//     </div>
//   );
// }