import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/EditUserComp.css"

const EditMoviePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState({
        name: '',
        year_premiered: '',
        genres: [],
        image_url: ''
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/movies/${id}`, movie);
            navigate('/main-page/movies/all-movies');
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleCancel = () => {
        navigate('/main-page/movies/all-movies');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/movies/${id}`);
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [id]); 

    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={movie.name} onChange={handleChange} placeholder={movie.name} required />
                </div>
                <div>
                    <label>Genres:</label>
                    <input type="text" name="genres" value={movie.genres.join(',')} onChange={handleChange} placeholder={movie.genres.join(',')} required />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="image_url" value={movie.image_url} onChange={handleChange} placeholder={movie.image_url} required />
                </div>
                <div>
                    <label>Year Premiered:</label>
                    <input type="number" name="year_premiered" value={movie.year_premiered} onChange={handleChange} placeholder={movie.year_premiered} required />
                </div>
                <div>
                    <button type="submit">Update</button> {''}
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditMoviePage;
