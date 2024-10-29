import React, { useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { v4 as uuidv4 } from "uuid";
import "./MovieForm.css"; // Import the CSS file
import AdminNavbar from "./AdminNavbar";

const MovieCreate = () => {
  const [movieName, setMovieName] = useState("");
  const [movieId, setMovieId] = useState(uuidv4());
  const [movieTrailerVideo, setMovieTrailerVideo] = useState("");
  const [movieTrailerVideo2, setMovieTrailerVideo2] = useState("");
  const [movieTrailerVideo3, setMovieTrailerVideo3] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState(""); // Comma-separated string
  const [release_date, setReleaseDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [languages, setLanguages] = useState("");
  const [country, setCountry] = useState("");
  const [age_rating, setAgeRating] = useState("");
  const [thumbnail_url, setThumbnailUrl] = useState("");
  const [trailer_url, setTrailerUrl] = useState("");
  const [availability_status, setAvailabilityStatus] = useState(false);
  const [genres, setGenres] = useState("");
  const [movieimages, setMovieImages] = useState([
    { movie_images_id: uuidv4(), image_url: "", description: "" },
  ]);

  //added new attributes
  const [imdb_rating, setImdbRating] = useState(0.0); // Double type
  const [highest_video_quality, setHighestVideoQuality] = useState(""); // Enum values

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_title: movieName,
      movie_id: movieId,
      description,
      director,
      cast: cast.split(",").map((item) => item.trim()),
      release_date,
      duration: parseInt(duration),
      languages: languages.split(",").map((item) => item.trim()),
      country,
      age_rating,
      thumbnail_url,
      trailer_url,
      availability_status,
      genres: genres.split(",").map((item) => item.trim()),
      qualityUrls: {
        quality_id: uuidv4(),
        "480p": movieTrailerVideo,
        "720p": movieTrailerVideo2,
        "1080p": movieTrailerVideo3,
      },
      movieImages: movieimages,
      imdb_rating: parseFloat(imdb_rating), // Convert to float/double
      highest_video_quality, // Enum value
    };

    try {
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        movieId,
        movieData
      );
      alert("Movie details added successfully!");
      console.log("Movie details added successfully!");
      setMovieName("");
      setMovieId(uuidv4());
      setMovieImages([
        { movie_images_id: uuidv4(), image_url: "", description: "" },
      ]);
      setMovieTrailerVideo("");
      setMovieTrailerVideo2("");
      setMovieTrailerVideo3("");
      setDescription("");
      setDirector("");
      setCast("");
      setReleaseDate("");
      setDuration(0);
      setLanguages("");
      setCountry("");
      setAgeRating("");
      setThumbnailUrl("");
      setTrailerUrl("");
      setAvailabilityStatus(false);
      setGenres("");
      setImdbRating(0.0);
      setHighestVideoQuality("");
    } catch (error) {
      alert("Error adding movie details:", error);
      console.error("Error adding movie details:", error);
    }
  };

  const handleAddScreenshot = () => {
    setMovieImages((prevMovieImages) => [
      ...prevMovieImages,
      { image_url: "", movie_images_id: uuidv4(), description: "" },
    ]);
  };

  const handleScreenshotChange = (index, field, value) => {
    const updatedMovieImages = movieimages.map((screenshot, i) =>
      i === index ? { ...screenshot, [field]: value } : screenshot
    );
    setMovieImages(updatedMovieImages);
  };

  const handleRemoveScreenshot = (index) => {
    setMovieImages((prevMovieImages) =>
      prevMovieImages.filter((_, i) => i !== index)
    );
  };

  const handleCheckboxChange = () => {
    setAvailabilityStatus((prevStatus) => !prevStatus); // Toggle between true and false
  };
  // console.log("avb_stat", availability_status);
  return (
    <>
      <AdminNavbar />
      <div className="form-container">
        <h2>Add New Movie Details</h2>

        <form onSubmit={handleSubmit}>
          <label>Movie Name</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Movie Name (e.g., Inception)"
            required
          />

          <label>Movie ID</label>
          <input
            type="text"
            value={movieId}
            readOnly
            placeholder="Generated Unique Movie ID"
          />

          <label>Description</label>
          <textarea
            type="text"
            value={description}
            rows="5"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of the movie"
            required
          />

          <label>Director</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Director's name (e.g., Christopher Nolan)"
            required
          />

          {/* New form field for IMDb Rating */}
          <label>IMDb Rating</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={imdb_rating}
            onChange={(e) => setImdbRating(e.target.value)}
            placeholder="IMDb Rating (e.g., 8.5)"
            required
          />

          {/* New form field for Highest Video Quality (Enum) */}
          <label>Highest Video Quality</label>
          <select
            value={highest_video_quality}
            className="p-1 rounded mb-1 bg-dark text-light"
            onChange={(e) => setHighestVideoQuality(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Quality
            </option>
            <option value="HD 1080">HD 1080</option>
            <option value="HD 720">HD 720</option>
            <option value="DVD">DVD</option>
            <option value="TS">TS</option>
          </select>

          <label>Cast</label>
          <input
            type="text"
            value={cast}
            onChange={(e) => setCast(e.target.value)}
            placeholder="Comma-separated cast (e.g., Leonardo DiCaprio, Joseph Gordon-Levitt)"
            required
          />

          <label>Release Date</label>
          <input
            type="date"
            value={release_date}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />

          <label>Duration (in minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration in minutes (e.g., 148)"
            required
          />

          <label>Languages</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="Comma-separated languages (e.g., English, Spanish)"
            required
          />

          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder=" country (e.g., USA, UK)"
            required
          />

          <label>Age Rating</label>
          <input
            type="text"
            value={age_rating}
            onChange={(e) => setAgeRating(e.target.value)}
            placeholder="Age rating (e.g., PG-13)"
            required
          />

          <label>Poster Card image URL</label>
          <input
            type="url"
            value={thumbnail_url}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="image URL"
            required
          />

          <label>Video Thumbnail image URL</label>
          <input
            type="url"
            value={trailer_url}
            onChange={(e) => setTrailerUrl(e.target.value)}
            placeholder="image URL"
            required
          />

          <div>
            <label className="custom-checkbox-label">
              Availability Status
              <input
                type="checkbox"
                checked={availability_status}
                onChange={handleCheckboxChange}
                className="custom-checkbox"
              />
              <span className="checkmark"></span>
            </label>
            <p>
              Status:{" "}
              <span style={{ color: "blue" }}>
                {availability_status ? "Available" : "Not Available"}
              </span>
            </p>
          </div>

          <label>Genres</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            placeholder="Comma-separated genres (e.g., Action, Sci-Fi)"
            required
          />

          <label>Movie Video in (480p)</label>
          <input
            type="url"
            value={movieTrailerVideo}
            onChange={(e) => setMovieTrailerVideo(e.target.value)}
            placeholder="Movie URL for 480p quality"
          />

          <label>Movie Video in (720p)</label>
          <input
            type="url"
            value={movieTrailerVideo2}
            onChange={(e) => setMovieTrailerVideo2(e.target.value)}
            placeholder="Movie URL for 720p quality"
          />

          <label>Movie Video in (1080p)</label>
          <input
            type="url"
            value={movieTrailerVideo3}
            onChange={(e) => setMovieTrailerVideo3(e.target.value)}
            placeholder="Movie URL for 1080p quality"
          />

          <h3>Movie Images</h3>
          {movieimages.map((screenshot, index) => (
            <div key={index}>
              <label>Screenshot URL</label>
              <input
                type="url"
                placeholder="URL of screenshot"
                value={screenshot.image_url}
                onChange={(e) =>
                  handleScreenshotChange(index, "image_url", e.target.value)
                }
                required
              />
              <label>Description</label>
              <input
                type="text"
                placeholder="Description of screenshot"
                value={screenshot.description}
                onChange={(e) =>
                  handleScreenshotChange(index, "description", e.target.value)
                }
              />
              <button
                type="button"
                className="bg-danger w-50"
                onClick={() => handleRemoveScreenshot(index)}
              >
                Remove Screenshot
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-dark w-50"
            onClick={handleAddScreenshot}
          >
            Add Screenshot
          </button>
          <hr />
          <div className="text-center w-100 d-flex justify-content-center">
            <button type="submit" className="text-center w-50">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MovieCreate;
