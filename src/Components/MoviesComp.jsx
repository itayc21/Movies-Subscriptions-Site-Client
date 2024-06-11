
import React, { useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../styles/MoviesComp.css'

const MoviesComp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const allMoviesButtonRef = useRef(null);

    useEffect(() => {
        if (location.pathname === '/main-page/movies') {
            allMoviesButtonRef.current.click();
        }
    }, [location]);

    return (
        <div className="movies-container" style={{ border: '1px solid black' }}>
            <h1>Movies</h1>
            <button ref={allMoviesButtonRef} onClick={() => navigate("all-movies")}>ALL Movies</button>
            <button onClick={() => navigate('add-movie')}>Add Movie</button>
            <Outlet />
        </div>
    );
};

export default MoviesComp;