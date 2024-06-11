import React, { useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const SubscriptionsComp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const allMembersButtonRef = useRef(null);

    useEffect(() => {
        if (location.pathname === '/main-page/subscriptions') {
            allMembersButtonRef.current.click();
        }
    }, [location]);

    return (
        <div className="subscriptions-container" style={{ border: '1px solid black' }}>
            <h1>Subscriptions</h1>
            <button ref={allMembersButtonRef} onClick={() => navigate("all-members")}>All Members</button> {''}
            <button onClick={() => navigate('add-member')}>Add Member</button>
            <Outlet />
        </div>
    );
};

export default SubscriptionsComp;
