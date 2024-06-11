import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddNewMovieComp.css';

const subscriptions_url = "http://localhost:3000/subscriptions";
const movies_url = "http://localhost:3000/movies";

const AddNewMovieComp = ({ memberId }) => {
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);

    useEffect(() => {
        const fetchUnwatchedMovies = async () => {
            try {
             
                const { data: subscriptions } = await axios.get(`${subscriptions_url}?member_id=${memberId}`);
                const subscribedMovieIds = subscriptions.map(sub => sub.movie_id._id);

             
                const { data: allMovies } = await axios.get(movies_url);

                
                const unsubscribedMovies = allMovies.filter(movie => !subscribedMovieIds.includes(movie._id));
                setUnwatchedMovies(unsubscribedMovies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUnwatchedMovies();
    }, [memberId]);

    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (selectedMovie && selectedDate) {
                const subscriptionData = {
                    movie_id: selectedMovie,
                    member_id: memberId,
                    date: selectedDate
                };

                await axios.post(subscriptions_url, subscriptionData);
                alert('Subscription added successfully!');
                window.location.reload(); 
            } else {
                alert('Please select a movie and date.');
            }
        } catch (error) {
            console.error('Error adding subscription:', error);
        }
    };

    return (
        <div className="add-movie-container"> 
            <h2>Add a new movie</h2>
            <form className="add-movie-form" onSubmit={handleSubmit}> 
                <select value={selectedMovie} onChange={handleMovieChange}>
                    <option value="">Select a movie</option>
                    {unwatchedMovies.map(movie => (
                        <option key={movie._id} value={movie._id}>{movie.name}</option>
                    ))}
                </select>
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={handleDateChange} 
                />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    );
};

export default AddNewMovieComp;
