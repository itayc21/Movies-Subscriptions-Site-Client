import React from 'react';
import '../styles/UsersComp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserComp = ({ user }) => {
  const navigate = useNavigate();

  const edit = () => {
    const userId = user._id;
    if (userId) {
      navigate(`/main-page/users-management/edit-user/${userId}`);
    } else {
      console.error('User ID is undefined');
    }
  };

  const del = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        const userIdToDelete = user._id;
        await axios.delete(`http://localhost:3000/users/${userIdToDelete}`);
        window.location.reload(); 
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <li className="user-item">
      <div className="user-details">
        Name: {' '} <span className="user-name">{user.fullName}</span> <br /> <br />
        Username: {' '} <span className="user-username">{user.username}</span> <br /> <br />
        Password: {' '} <span className="user-password">{user.password}</span> <br /> <br />
      </div>
      <div className="actions">
        <button onClick={edit}>Edit</button> {''}
        <button onClick={del}>Delete</button>
      </div>
    </li>
  );
};

export default UserComp;
