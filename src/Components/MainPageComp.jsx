
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const MainPageComp = () => {
    const navigate = useNavigate();

    return (
        <div style={{ border: '1px solid black' }}>
            <h1>Movie Subscriptions Web-Site</h1>
            <br />
            <button onClick={() => navigate("/main-page/movies")}>Movies</button> {''}
            <button onClick={() => navigate("/main-page/subscriptions")}>Subscriptions</button> {''}
            <button onClick={() => navigate("/main-page/users-management")}> Users Management</button> {''}
            <button onClick={() => navigate('/')}>Log out</button> {''}
            <Outlet />
        </div>
    );
};

export default MainPageComp;