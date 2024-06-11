import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const member_url = "http://localhost:3000/members";

const AddMemberComp = () => {
    const navigate = useNavigate();
    const [memberData, setMemberData] = useState({
        name: '',
        email: '',
        city: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMemberData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveMember = async (e) => {
        e.preventDefault(); 

        try {
            await axios.post(member_url, memberData);
            console.log('Member data saved successfully!');
            navigate('/main-page/subscriptions/all-members');
        } catch (error) {
            console.error('Error saving member data:', error);
        }
    };

    const handleCancel = () => {
        navigate('/main-page/subscriptions');
    };

    return (
        <div>
            <h2>Add New Member</h2>
            <form onSubmit={handleSaveMember}>
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Member Name"
                    value={memberData.name}
                    onChange={handleInputChange}
                />
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={memberData.email}
                    onChange={handleInputChange}
                />
                <input
                    required
                    type="text"
                    name="city"
                    placeholder="City"
                    value={memberData.city}
                    onChange={handleInputChange}
                />
                <button type="submit">Save Member</button> {''}
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddMemberComp;
