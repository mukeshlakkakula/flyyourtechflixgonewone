import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import MovieUpdate from "./MovieUpdate";
import "./MovieList.css"; // Import the CSS file for styling

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID
        );
        setMovies(response.documents);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (movieId) => {
    try {
      await databases.deleteDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        movieId
      );
      setMovies(movies.filter((movie) => movie.movie_id !== movieId));
      console.log("Movie deleted successfully!");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleUpdateClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseUpdateForm = () => {
    setSelectedMovieId(null);
  };

  const searchMovie = (e) => {
    setSearchTitle(e.target.value);
  };

  const searchMovies = movies.filter((movie) =>
    movie.movie_title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      {selectedMovieId && (
        <MovieUpdate
          movieId={selectedMovieId}
          onClose={handleCloseUpdateForm}
        />
      )}
      <h2 className="movie-list-title">Movie List</h2>
      <input
        type="search"
        className="search-input"
        placeholder="Search by movie title"
        value={searchTitle}
        onChange={searchMovie}
      />
      <ul className="movie-list">
        {searchMovies.map((movie) => (
          <li key={movie.movie_id} className="movie-item">
            <h3 className="movie-title">{movie.movie_title}</h3>
            <div className="movie-actions">
              <button
                className="update-btn"
                onClick={() => handleUpdateClick(movie.movie_id)}
              >
                Update
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(movie.movie_id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
