import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className="header">
      <div className="header-section logo">
        <h2>Sarvaswam</h2>
      </div>

      <nav className="header-section center-nav">
        <Link to="/">Home</Link>
        <Link to="/cart">MyCart</Link>
        <Link to="/order">MyOrder</Link>
      </nav>

      <div className="header-section right-nav">
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user?.token ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
































// import React from "react";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import App, { AppContext } from "../App";

// export default function Header() {
//   const { user } = useContext(AppContext);
//   return (
//     <div>
//       <h1>MERN Frontend</h1>
//       <div className="nav-links">
//       <Link to="/">Home</Link>
//       <Link to="/cart">MyCart</Link>
//       <Link to="/order">MyOrder</Link>
//       {/* <Link to="/admin">Admin</Link> */}

//       {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      
//       {user?.token ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link> }

// </div>
//     </div>
//   );
// }