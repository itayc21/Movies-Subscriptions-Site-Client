import React, { useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const UsersManagementComp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const allUsersButtonRef = useRef(null);

    useEffect(() => {
        if (location.pathname === '/main-page/users-management') {
            allUsersButtonRef.current.click();
        }
    }, [location]);

    return (
        <div className="users-container" style={{ border: '1px solid black' }}>
            <h1>Users Management</h1>
            <button ref={allUsersButtonRef} onClick={() => navigate("all-users")}>ALL Users</button> {''}
            <button onClick={() => navigate('add-user')}>Add User</button>
            <Outlet />
        </div>
    );
};

export default UsersManagementComp;
