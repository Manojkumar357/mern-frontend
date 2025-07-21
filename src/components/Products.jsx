import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import "./Products.css"
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      const result = await axios.delete(url);
      setError("User Deleted Successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      const result = await axios.post(url, form);
      setError("User added succesfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...form,
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      const result = await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      ...form,
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };
  return (
  <div className="products-page">
    <h2 className="products-heading">Product Management</h2>

    {error && <div className="error-message">{error}</div>}

    <div className="form-section">
      <form ref={frmRef} className="product-form">
        <input
          name="productName"
          value={form.productName}
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <input
          name="description"
          value={form.description}
          type="text"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          value={form.price}
          type="text"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          name="imgUrl"
          value={form.imgUrl}
          type="text"
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <div className="form-buttons">
          {editId ? (
            <>
              <button className="btn update-btn" onClick={handleUpdate}>Update</button>
              <button className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="btn add-btn" onClick={handleAdd}>Add</button>
          )}
        </div>
      </form>
    </div>

    <div className="search-section">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <button className="btn search-btn" onClick={fetchProducts}>Search</button>
    </div>

    <div className="table-section">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((value) => (
            <tr key={value._id}>
              <td>{value.productName}</td>
              <td>{value.description}</td>
              <td>{value.price}</td>
              <td>{value.imgUrl}</td>
              <td>
                <button className="btn edit-btn" onClick={() => handleEdit(value)}>Update</button>
                <button className="btn delete-btn" onClick={() => handleDelete(value._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="pagination">
      <button
        className="btn pagination-btn"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <span>Page {page} of {totalPages}</span>
      <button
        className="btn pagination-btn"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  </div>
);

}