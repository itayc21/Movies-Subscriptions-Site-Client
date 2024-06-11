import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUserComp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
      navigate('/main-page/users-management');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    navigate('/main-page/users-management');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            placeholder={user.fullName}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder={user.username}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder={user.password}
            required
          />
        </div>
        <div>
          <button type="submit">Update</button> {''}
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserComp;
