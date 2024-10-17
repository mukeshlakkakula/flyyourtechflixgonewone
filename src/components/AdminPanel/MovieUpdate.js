import React, { useState, useEffect } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { v4 as uuidv4 } from "uuid";

const MovieUpdate = ({ movieId, onClose }) => {
  const [movieName, setMovieName] = useState("");
  const [movieTrailerVideo, setMovieTrailerVideo] = useState("");
  const [movieImages, setMovieImages] = useState([
    { movie_images_id: uuidv4(), image_url: "" },
  ]);

  useEffect(() => {
    // Fetch the movie details for updating when the component is mounted
    const fetchMovieDetails = async () => {
      try {
        const response = await databases.getDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
          movieId
        );
        // Set the data into the form fields
        setMovieName(response.movie_title);
        setMovieTrailerVideo(response.qualityUrls["480p"]);
        setMovieImages(response.movieImages);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_title: movieName,
      qualityUrls: {
        quality_id: uuidv4(),
        "480p": movieTrailerVideo,
      },
      movieImages,
    };

    try {
      await databases.updateDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        movieId,
        movieData
      );
      console.log("Movie details updated successfully!");
      onClose(); // Close the form after successful update
    } catch (error) {
      console.error("Error updating movie details:", error);
    }
  };

  const handleAddScreenshot = () => {
    setMovieImages((prevMovieImages) => [
      ...prevMovieImages,
      { movie_images_id: uuidv4(), image_url: "" },
    ]);
  };

  const handleScreenshotChange = (index, field, value) => {
    const updatedMovieImages = movieImages.map((screenshot, i) =>
      i === index ? { ...screenshot, [field]: value } : screenshot
    );
    setMovieImages(updatedMovieImages);
  };

  const handleRemoveScreenshot = (index) => {
    setMovieImages((prevMovieImages) =>
      prevMovieImages.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="form-container">
      <h2>Update Movie Details of {movieName}</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Movie Name"
          required
        />
        <input
          type="text"
          value={movieId}
          readOnly
          placeholder="Movie ID (Unique)"
        />
        <input
          type="url"
          value={movieTrailerVideo}
          onChange={(e) => setMovieTrailerVideo(e.target.value)}
          placeholder="Trailer Video URL"
          required
        />

        <h3>Movie Images</h3>
        {movieImages.map((screenshot, index) => (
          <div key={index}>
            <input
              type="url"
              placeholder="Screenshot URL"
              value={screenshot.image_url}
              onChange={(e) =>
                handleScreenshotChange(index, "image_url", e.target.value)
              }
              required
            />
            <button type="button" onClick={() => handleRemoveScreenshot(index)}>
              Remove Screenshot
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddScreenshot}>
          Add Screenshot
        </button>

        <button type="submit">Update Movie</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default MovieUpdate;
