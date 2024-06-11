import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom'; 
import '../styles/MoviesWatchedComp.css';
import AddNewMovieComp from './AddNewMovieComp';

const MoviesWatchedComp = ({ subscriptions }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState);
    };

    const subscribeToNewMovie = () => {
        toggleDropdown();
        navigate('/main-page/subscriptions/all-members/watched-movies/add-new-movie');
    };

    return (
        <div className="movies-watched">
            <h4>Movies Watched</h4>
            <button className="subscribe-button" onClick={subscribeToNewMovie}>
                Subscribe to new movie
            </button>
            {showDropdown && (
                <div className="dropdown">
                    
                </div>
            )}
            <ul>
                {subscriptions && subscriptions.map(sub => (
                    <li key={sub._id}>
                        <span className="movie-link">
                            {sub.movie_id.name} 
                        </span>
                        , {new Date(sub.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
            <Outlet />
            <AddNewMovieComp />
        </div>
    );
};

export default MoviesWatchedComp;
