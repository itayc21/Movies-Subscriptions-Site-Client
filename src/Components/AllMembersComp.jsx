import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AllMovies.css';
import MemberComp from './MemberComp';


const members_url = "http://localhost:3000/members";

const AllMembersComp = () => {
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const getMembers = async () => {
        try {
            const { data } = await axios.get(members_url);
            setMembers(data);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
        getMembers();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="search-bar">
                <input
                    type="search"
                    placeholder="Search for a member"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <ul className="members-list">
                {filteredMembers.map((member) => (
                    <MemberComp key={member._id} member={member} />
                ))}
            </ul>
        </div>
    );
};

export default AllMembersComp;
