import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/AddMovie.css"

const movie_url = "http://localhost:3000/movies";

const AddMovieComp = () => {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState({
        name: '',
        genres: [],
        image_url: '',
        year_premiered: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveMovie = async (e) => {
        e.preventDefault(); 

        const formattedData = {
            ...movieData,
            genres: movieData.genres.split(',').map(genre => genre.trim()),
            year_premiered: parseInt(movieData.year_premiered, 10)
        };

        try {
            await axios.post(movie_url, formattedData);
            console.log('Movie data saved successfully!');
            navigate('/main-page/movies/all-movies');
        } catch (error) {
            console.error('Error saving movie data:', error);
        }
    };

    const handleCancel = () => {
        navigate('/main-page/movies');
    };

    return (
        <div>
            <h2>Add New Movie</h2>
            <form onSubmit={handleSaveMovie}>
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Movie Name"
                    value={movieData.name}
                    onChange={handleInputChange}
                />
                <input
                    required
                    type="text"
                    name="genres"
                    placeholder="Genres (comma-separated)"
                    value={movieData.genres}
                    onChange={handleInputChange}
                />
                <input
                    required
                    type="text"
                    name="image_url"
                    placeholder="Image URL"
                    value={movieData.image_url}
                    onChange={handleInputChange}
                />
                <input
                    required
                    type="text"
                    name="year_premiered"
                    placeholder="Premiered Year"
                    value={movieData.year_premiered}
                    onChange={handleInputChange}
                />
                <button type="submit">Save Movie</button> {''}
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddMovieComp;
