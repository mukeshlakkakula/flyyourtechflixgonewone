// src/components/MovieList.js
import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import MovieUpdate from "./MovieUpdate";
import AdminNavbar from "./AdminNavbar";

const WebSeriesList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_WEBSERIES_COLLECTION_ID
        );
        setMovies(response.documents);
      } catch (error) {
        console.error(
          "Error fetching movies:",
          error,
          process.env.REACT_APP_WEBSERIES_COLLECTION_ID
        );
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
    console.log("mvn", searchTitle);
  };
  let searchMovies = movies.filter((each) =>
    each.movie_title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />
      <div>
        {selectedMovieId && (
          <MovieUpdate
            movieId={selectedMovieId}
            onClose={handleCloseUpdateForm}
          />
        )}
        <h2>Movie List</h2>
        <input type="search" onChange={searchMovie} />
        <ul>
          {searchMovies.map((movie) => (
            <li key={movie.movie_id}>
              <h2 className="w-75">{movie.movie_title}</h2>
              <button onClick={() => handleUpdateClick(movie.movie_id)}>
                Update
              </button>
              <button onClick={() => handleDelete(movie.movie_id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WebSeriesList;
