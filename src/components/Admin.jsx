import React from "react";
import "../index.css"
import { Outlet, Link } from "react-router-dom";
export default function Admin() {
  return (
    <div>
      <div className="nav">
      <Link to="/admin">Users</Link>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/orders">Orders</Link></div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}