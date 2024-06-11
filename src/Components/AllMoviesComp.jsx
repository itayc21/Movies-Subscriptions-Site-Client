

import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AllMovies.css';
import MovieComp from './MovieComp';

const movies_url = "http://localhost:3000/movies";

const AllMoviesComp = () => {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const getMovies = async () => {
        try {
            const { data } = await axios.get(movies_url);
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="search-bar">
                <input
                    type="search"
                    placeholder="Search for a movie"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <ul className="movies-list">
                {filteredMovies.map((movie) => (
                    <MovieComp key={movie._id} movie={movie} />
                ))}
            </ul>
        </div>
    );
};

export default AllMoviesComp;
