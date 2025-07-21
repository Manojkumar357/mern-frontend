import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    if (qty <= 1) return;
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {error && <p className="error">{error}</p>}

      <div className="cart-grid">
        {cart && cart.length > 0 ? (
          cart.map(
            (value) =>
              value.qty > 0 && (
                <div key={value._id} className="cart-card">
                  <h4>{value.productName}</h4>
                  <p>Price: ₹{value.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => decrement(value._id, value.qty)}>-</button>
                    <span>{value.qty}</span>
                    <button onClick={() => increment(value._id, value.qty)}>+</button>
                  </div>
                  <p>Total: ₹{value.price * value.qty}</p>
                  <button className="remove-btn" onClick={() => removeItem(value._id)}>🗑 Remove</button>
                </div>
              )
          )
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Your cart is empty.</p>
        )}
      </div>

      <div className="order-summary">
        <h4>Order Value: ₹{orderValue}</h4>
        {user?.token ? (
          <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
        ) : (
          <button className="place-order-btn" onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </div>
    </div>
  );
}
