import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersComp from '../Components/UsersComp';
import '../styles/AllUsersComp.css';

const AllUsersComp = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="all-users-container">
            <h2>All Users</h2>
            <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="user-list">
                    {filteredUsers.map((user) => (
                        <UsersComp key={user._id} user={user} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllUsersComp;
