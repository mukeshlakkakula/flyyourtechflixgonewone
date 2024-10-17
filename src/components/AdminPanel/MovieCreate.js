// src/components/MovieForm.js
import React, { useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { v4 as uuidv4 } from "uuid";
// import "./index.css"; // Import CSS file for styling

const MovieCreate = () => {
  const [movieName, setMovieName] = useState("");
  const [movieId, setMovieId] = useState(uuidv4()); // Generate unique ID

  const [movieTrailerVideo, setMovieTrailerVideo] = useState("");

  const [movieimages, setmovieimages] = useState([
    { movie_images_id: uuidv4(), image_url: "" },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_title: movieName,
      movie_id: movieId,
      qualityUrls: {
        quality_id: uuidv4(),
        "480p": movieTrailerVideo,
      },
      movieImages: movieimages,
    };
    console.log("Web series data:", movieData);
    console.log("Database ID:", process.env.REACT_APP_DATABASE_ID);
    console.log(
      "Collection ID:",
      process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID
    );
    console.log("Document ID:", movieId);
    // console.log("url", url);
    try {
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        movieId, // Use movieId as the document ID
        movieData
      );
      console.log("Movie details added successfully!");
      // Reset the form or handle further logic
      setMovieName("");
      setMovieId(uuidv4()); // Reset movie ID
      setmovieimages([{ movie_images_id: uuidv4(), image_url: "" }]);
      setMovieTrailerVideo("");
    } catch (error) {
      console.error("Error adding movie details:", error);
    }
  };

  const handleAddScreenshot = () => {
    setmovieimages((prevmovieimages) => [
      ...prevmovieimages,
      { image_url: "", movie_images_id: uuidv4() },
    ]);
  };

  const handleScreenshotChange = (index, field, value) => {
    const updatedmovieimages = movieimages.map((screenshot, i) =>
      i === index ? { ...screenshot, [field]: value } : screenshot
    );
    setmovieimages(updatedmovieimages);
  };

  const handleRemoveScreenshot = (index) => {
    setmovieimages((prevmovieimages) =>
      prevmovieimages.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="form-container">
      <h2>Add Movie Details</h2>
      <form onSubmit={handleSubmit}>
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
        />

        <h3>movieimages</h3>
        {movieimages.map((screenshot, index) => (
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

            {/* <textarea
              placeholder="Screenshot Description"
              value={screenshot.description}
                onChange={(e) =>
                  handleScreenshotChange(index, "description", e.target.value)
                }
                required
            /> */}

            <button type="button" onClick={() => handleRemoveScreenshot(index)}>
              Remove Screenshot
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddScreenshot}>
          Add Screenshot
        </button>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default MovieCreate;
