import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/MovieComp.css";
import SubscriptionsWatched from './SubscriptionsWatchedComp';

const subscriptions_url = "http://localhost:3000/subscriptions";
const members_url = "http://localhost:3000/members";

const MovieComp = ({ movie }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const { data } = await axios.get(`${subscriptions_url}?movie_id=${movie._id}`);


                const subscriptionsWithMembers = await Promise.all(data.map(async (sub) => {
                    const memberResponse = await axios.get(`${members_url}/${sub.member_id}`);
                    return { ...sub, memberName: memberResponse.data.name };
                }));

                setSubscriptions(subscriptionsWithMembers);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };

        fetchSubscriptions();
    }, [movie._id, deleted]);

    const edit = () => {
        navigate(`/main-page/movies/edit-movie/${movie._id}`);
    };

    const Del = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this movie?");
        if (confirmed) {
            try {
                const movieIdToDelete = movie._id;
                await axios.delete(`http://localhost:3000/movies/${movieIdToDelete}`);
                window.location.reload(); 
            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        }
    };


    return (
        <li className="movie-item">
            <img src={movie.image_url} alt={movie.name} className="movie-image" />
            <div className="movie-details">
                <p className="movie-title">{movie.name}</p>
                <p className="movie-genres">{movie.genres.join(', ')}</p>
                <p className="movie-year">{movie.year_premiered}</p>
                <SubscriptionsWatched subscriptions={subscriptions} />
            </div>
            <div className="actions">
                <button onClick={edit}>Edit</button>
                <button onClick={Del}>Delete</button>
            </div>
        </li>
    );
};

export default MovieComp;
