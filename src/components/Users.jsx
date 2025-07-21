import React from "react";
import "./Users.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchUsers = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setUsers(result.data.users);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page]);
  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      const result = await axios.delete(url);
      setError("User Deleted Successfully");
      fetchUsers();
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
      const url = `${API_URL}/api/users`;
      const result = await axios.post(url, form);
      setError("User added succesfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      ...form,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/${editId}`;
      const result = await axios.patch(url, form);
      fetchUsers();
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };
  return (
    <div className="user-management">
  <h2>User Management</h2>
  {error && <p className="error-msg">{error}</p>}

  <div className="form-container">
    <form ref={frmRef} className="user-form">
      <input name="firstName" value={form.firstName} type="text" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" value={form.lastName} type="text" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" value={form.email} type="text" placeholder="Email Address" onChange={handleChange} required />
      <input name="password" value={form.password} type="password" placeholder="New Password" onChange={handleChange} required />
      <select name="role" value={form.role} required onChange={handleChange}>
        <option value="">--Select Role--</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="button-group">
        {editId ? (
          <>
            <button className="btn update" onClick={handleUpdate}>Update</button>
            <button className="btn cancel" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className="btn add" onClick={handleAdd}>Add</button>
        )}
      </div>
    </form>
  </div>

  <div className="search-bar">
    <input type="text" placeholder="Search..." onChange={(e) => setSearchVal(e.target.value)} />
    <button onClick={() => fetchUsers()}>Search</button>
  </div>

  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email Address</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((value) => (
          <tr key={value._id}>
            <td>{value.firstName}</td>
            <td>{value.lastName}</td>
            <td>{value.email}</td>
            <td>{value.role}</td>
            <td>
              <button className="btn edit" onClick={() => handleEdit(value)}>Edit</button>
              <button className="btn delete" onClick={() => handleDelete(value._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="pagination">
    <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
    <span>Page {page} of {totalPages}</span>
    <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
  </div>
</div>
  );
}