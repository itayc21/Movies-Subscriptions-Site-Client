import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const users_url = "http://localhost:3000/users";

const AddUserComp = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullName: '',
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();

        try {
            await axios.post(users_url, userData);
            console.log('User data saved successfully!');
            navigate('/main-page/users-management/all-users');
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleCancel = () => {
        navigate('/main-page/users-management');
    };

    return (
        <div className="add-user-container">
            <h2>Add New User</h2>
            <form onSubmit={handleSaveUser}>
                <input
                    required
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={userData.fullName}
                    onChange={handleInputChange}
                />
                <input
                    required
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleInputChange}
                />
                <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Save User</button> {' '}
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddUserComp;
