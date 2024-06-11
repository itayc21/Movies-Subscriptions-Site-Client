import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/MemberComp.css";
import AddNewMovieComp from './AddNewMovieComp';

const subscriptions_url = "http://localhost:3000/subscriptions";
const movies_url = "http://localhost:3000/movies";

const MemberComp = ({ member }) => {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [showAddNewMovie, setShowAddNewMovie] = useState(false);
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const { data } = await axios.get(subscriptions_url);
                
               
                const memberSubscriptions = data.filter(sub => sub.member_id._id === member._id);
                
              
                const allMoviesResponse = await axios.get(movies_url);
                const allMovies = allMoviesResponse.data;
                
               
                const watchedMovieIds = memberSubscriptions.map(sub => sub.movie_id._id);
                
              
                const unwatched = allMovies.filter(movie => !watchedMovieIds.includes(movie._id));
                setUnwatchedMovies(unwatched);

                
                const subscriptionsWithMovies = memberSubscriptions.map(sub => ({
                    ...sub,
                    movieName: sub.movie_id.name,
                    dateWatched: new Date(sub.date).toLocaleDateString()
                }));
                setSubscriptions(subscriptionsWithMovies);
                
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        };

        fetchSubscriptions();
    }, [member._id, deleted]);

    const edit = () => {
        navigate(`/main-page/subscriptions/edit-member/${member._id}`);
    };

    const del = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this member?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:3000/members/${member._id}`);
                console.log('Member deleted successfully.');
                setDeleted(true);
                window.location.reload();
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };

    return (
        <li className="member-item">
            <div className="member-details">
                <strong className="member-name">{member.name}</strong>
                <p className="member-email">Email: {member.email}</p>
                <p className="member-city">City: {member.city}</p>
            </div>
            <div className="actions">
                <button onClick={edit}>Edit</button>
                <button onClick={del}>Delete</button>
            </div>
            <div>
                <h3>Movies Watched</h3>
                {subscriptions.map(sub => (
                    <div key={sub.movie_id._id}>
                        <Link to={`/main-page/movies/all-movies`}>{sub.movieName}</Link>, {sub.dateWatched}
                    </div>
                ))}
                <button onClick={() => setShowAddNewMovie(!showAddNewMovie)}>Subscribe to new movie</button>
                {showAddNewMovie && <AddNewMovieComp memberId={member._id} unwatchedMovies={unwatchedMovies} />}
            </div>
        </li>
    );
};

export default MemberComp;
