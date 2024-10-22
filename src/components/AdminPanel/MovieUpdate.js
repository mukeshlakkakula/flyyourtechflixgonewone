import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";

import { v4 as uuidv4 } from "uuid";
import "./MovieForm.css"; // Import the CSS file
import AdminNavbar from "./AdminNavbar";

const MovieUpdate = ({ movieId, onClose }) => {
  const [movieData, setMovieData] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [movieTrailerVideo, setMovieTrailerVideo] = useState("");
  const [movieTrailerVideo2, setMovieTrailerVideo2] = useState("");
  const [movieTrailerVideo3, setMovieTrailerVideo3] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState(""); // Comma-separated string
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [languages, setLanguages] = useState("");
  const [country, setCountry] = useState("");
  const [age_rating, setAgeRating] = useState("");
  const [thumbnail_url, setThumbnailUrl] = useState("");
  const [trailer_url, setTrailerUrl] = useState("");
  const [availability_status, setAvailabilityStatus] = useState(false);
  const [genres, setGenres] = useState("");
  const [movieimages, setMovieImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch existing movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const response = await databases.getDocument(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
          movieId
        );

        console.log("res", response);
        setMovieData(response);
        setMovieName(response.movie_title);
        setDescription(response.description);
        setDirector(response.director);
        setCast(response.cast.join(", ")); // Convert array to comma-separated string
        setReleaseDate(formatDate(response.release_date));
        setDuration(response.duration);
        setLanguages(response.languages.join(", "));
        setCountry(response.country);
        setAgeRating(response.age_rating);
        setThumbnailUrl(response.thumbnail_url);
        setTrailerUrl(response.trailer_url);
        setAvailabilityStatus(response.availability_status);
        setGenres(response.genres.join(", "));
        setMovieTrailerVideo(response.qualityUrls["480p"]);
        setMovieTrailerVideo2(response.qualityUrls["720p"]);
        setMovieTrailerVideo3(response.qualityUrls["1080p"]);
        setMovieImages(response.movieImages || []);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setError("Failed to fetch movie data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // Returns only the date part in yyyy-MM-dd format
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedMovieData = {
      movie_title: movieName,
      description,
      director,
      cast: cast.split(",").map((item) => item.trim()),
      release_date: releaseDate,
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
    };

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await databases.updateDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        movieId,
        updatedMovieData
      );
      alert("Movie details updated successfully!");
      console.log("Movie details updated successfully!");
      onClose();
      // Redirect to the movie details page or a suitable page
    } catch (error) {
      alert(`Error updating movie details:, ${error}`);
      console.error("Error updating movie details:", error);
      setError("Error updating movie details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddScreenshot = () => {
    setMovieImages((prevMovieImages) => [
      ...prevMovieImages,
      { movie_images_id: uuidv4(), image_url: "", description: "" },
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const handleCheckboxChange = () => {
    setAvailabilityStatus((prevStatus) => !prevStatus); // Toggle between true and false
  };

  return (
    <>
      <div className="form-container">
        <h2>Update Movie Details</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form onSubmit={handleUpdate}>
          <label>Movie Name</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Movie Name"
            required
          />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of the movie"
            required
          />

          <label>Director</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            placeholder="Director's name"
            required
          />

          <label>Cast</label>
          <input
            type="text"
            value={cast}
            onChange={(e) => setCast(e.target.value)}
            placeholder="Comma-separated cast"
            required
          />

          <label>Release Date</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />

          <label>Duration (in minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration in minutes"
            required
          />

          <label>Languages</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="Comma-separated languages"
            required
          />

          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />

          <label>Age Rating</label>
          <input
            type="text"
            value={age_rating}
            onChange={(e) => setAgeRating(e.target.value)}
            placeholder="Age rating"
            required
          />

          <label>Thumbnail URL</label>
          <input
            type="url"
            value={thumbnail_url}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="URL of the movie's thumbnail"
            required
          />

          <label>Trailer URL</label>
          <input
            type="url"
            value={trailer_url}
            onChange={(e) => setTrailerUrl(e.target.value)}
            placeholder="URL of the movie's trailer"
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
            placeholder="Comma-separated genres"
            required
          />

          <label>Movie Video in (480p)</label>
          <input
            type="url"
            value={movieTrailerVideo}
            onChange={(e) => setMovieTrailerVideo(e.target.value)}
            placeholder="Movie video URL for 480p"
            required
          />

          <label>Movie Video in (720p)</label>
          <input
            type="url"
            value={movieTrailerVideo2}
            onChange={(e) => setMovieTrailerVideo2(e.target.value)}
            placeholder="Movie video URL for 720p"
            required
          />

          <label>Movie Video in (1080p)</label>
          <input
            type="url"
            value={movieTrailerVideo3}
            onChange={(e) => setMovieTrailerVideo3(e.target.value)}
            placeholder="Movie video URL for 1080p"
            required
          />

          <h3>Movie Screenshots</h3>
          {movieimages.map((screenshot, index) => (
            <div
              key={screenshot.movie_images_id}
              className="screenshot-container"
            >
              <label>Screenshot URL</label>
              <input
                type="url"
                value={screenshot.image_url}
                onChange={(e) =>
                  handleScreenshotChange(index, "image_url", e.target.value)
                }
                placeholder="Screenshot URL"
                required
              />

              <label>Screenshot Description</label>
              <input
                type="text"
                value={screenshot.description}
                onChange={(e) =>
                  handleScreenshotChange(index, "description", e.target.value)
                }
                placeholder="Screenshot description"
                required
              />
              <button
                type="button"
                className="w-50 bg-danger"
                onClick={() => handleRemoveScreenshot(index)}
              >
                Remove Screenshot
              </button>
            </div>
          ))}
          <button
            type="button"
            className="w-50 bg-dark"
            onClick={handleAddScreenshot}
          >
            Add Screenshot
          </button>
          <hr />
          <div className="text-center w-100 d-flex justify-content-center">
            <button type="submit" className="w-50" disabled={loading}>
              {loading ? "Updating Movie..." : "Update Movie"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MovieUpdate;
