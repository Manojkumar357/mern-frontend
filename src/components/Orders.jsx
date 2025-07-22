import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");

  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user || !user.token) return;

    setLoading(true);
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Fetched orders:", res.data);

      setOrders(res.data.orders || []);
      setTotalPages(res.data.total || 1);
      setError("");
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        setError("Failed to fetch orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.token) {
      fetchOrders();
    }
  }, [status, page, user]);

  const updateOrder = async (newStatus, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(
        url,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error(err);
      setError("Failed to update order.");
    }
  };

  const deleteOrder = async (id) => {
    try {
      const url = `${API_URL}/api/orders/delete/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
      setError("Failed to delete order.");
    }
  };

  if (!user) return null;

  return (
    <div className="order-container">
      <h2>Order Management</h2>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          <div className="filter-bar">
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <ul className="order-list">
            {orders.length > 0 ? (
              orders.map((order) => (
                <li key={order._id} className="order-item">
                  <div className="order-details">
                    {order._id} - ₹{order.orderValue} - {order.status}
                  </div>
                  <div className="order-actions">
                    {order.status === "Pending" && (
                      <>
                        <button
                          className="cancel-btn"
                          onClick={() => updateOrder("cancelled", order._id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="complete-btn"
                          onClick={() => updateOrder("completed", order._id)}
                        >
                          Complete
                        </button>
                      </>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li>No orders found.</li>
            )}
          </ul>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            Page {page} of {totalPages}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
