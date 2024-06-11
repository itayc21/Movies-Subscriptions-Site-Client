import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMemberPage = () => {
    const navigate = useNavigate();
    const { _id } = useParams(); 
    const [member, setMember] = useState({
        name: '',
        email: '',
        city: ''
    });
    

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/members/${_id}`);
                setMember(data);
            } catch (error) {
                console.error('Error fetching member:', error);
            }
        };

        fetchMember();
    }, [_id]); 

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/members/${_id}`, member); 
            navigate('/main-page/subscriptions/all-members');
        } catch (error) {
            console.error('Error updating member:', error);
        }
    };

    const handleCancel = () => {
        navigate('/main-page/subscriptions/all-members');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };
    console.log(_id);

    return (
        <div>
            <h2>Edit Member</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={member.name || ''} onChange={handleChange} placeholder="Enter name" required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={member.email || ''} onChange={handleChange} placeholder="Enter email" required />
                </div>
                <div>
                    <label>City:</label>
                    <input type="text" name="city" value={member.city || ''} onChange={handleChange} placeholder="Enter city" required />
                </div>
                <div>
                    <button type="submit">Update</button> {''}
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditMemberPage;
