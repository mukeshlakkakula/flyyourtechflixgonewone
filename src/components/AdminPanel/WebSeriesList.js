import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import MovieUpdate from "./MovieUpdate";
import "./MovieList.css"; // Import the CSS file for styling
import "./MovieForm.css";
import AdminNavbar from "./AdminNavbar";
import WebSeriesUpdate from "./WebSeriesUpdate";
const WebSeriesList = () => {
  // movies == webseries
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
        console.error("Error fetching Web series:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (movieId) => {
    var result = window.confirm("Are you sure you want to Delete Web series");
    if (result) {
      try {
        await databases.deleteDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
          movieId
        );
        setMovies(movies.filter((movie) => movie.movie_id !== movieId));
        alert("Web series deleted successfully!");
        console.log("Web series deleted successfully!");
        window.location.reload();
      } catch (error) {
        alert("Error deleting Web series:", error);
        console.error("Error deleting Web series:", error);
      }
    } else {
      alert("User clicked Cancel, action canceled.");
      console.log("User clicked Cancel, action canceled.");
    }
  };

  const handleUpdateClick = (movieId) => {
    setSelectedMovieId(movieId);
    window.scrollTo(0, 0);
  };

  const handleCloseUpdateForm = () => {
    setSelectedMovieId(null);
  };

  const searchMovie = (e) => {
    setSearchTitle(e.target.value);
  };

  const searchMovies = movies.filter((movie) =>
    movie.webseries_title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />
      <div className="movie-list-container">
        {selectedMovieId && (
          <WebSeriesUpdate
            movieId={selectedMovieId}
            onClose={handleCloseUpdateForm}
          />
        )}
        <h2 className="movie-list-title ">Web series List</h2>
        <input
          type="search"
          className="search-input bg-transparent"
          placeholder="Search by Web series title"
          value={searchTitle}
          onChange={searchMovie}
        />
        <ul className="movie-list ">
          {searchMovies.map((movie) => (
            <li
              key={movie.webseries_id}
              className="movie-item m-1 bg-light p-1 rounded"
            >
              <span className="movie-title d-flex align-items-center justify-content-center">
                {movie.webseries_title}
              </span>
              <div className="movie-actions">
                <button
                  className="update-btn"
                  onClick={() => handleUpdateClick(movie.webseries_id)}
                >
                  Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(movie.webseries_id)}
                >
                  Delete
                </button>
                <hr />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WebSeriesList;
