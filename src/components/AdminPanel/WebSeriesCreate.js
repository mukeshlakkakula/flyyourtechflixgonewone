import React, { useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { v4 as uuidv4 } from "uuid";
import "./MovieForm.css";
import AdminNavbar from "./AdminNavbar";

const WebSeriesCreate = () => {
  const [webseries_id, setWebseries_id] = useState(uuidv4()); // Unique ID
  const [webseries_title, setWebseries_title] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]); // Array of strings
  const [release_date, setReleaseDate] = useState(""); // Date/Time
  const [languages, setLanguages] = useState([]); // Array of strings
  const [country, setCountry] = useState("");
  const [age_rating, setAgeRating] = useState("");
  const [thumbnail_url, setThumbnailUrl] = useState("");
  const [trailer_url, setTrailerUrl] = useState("");
  const [availability_status, setAvailabilityStatus] = useState(false); // Boolean
  const [genres, setGenres] = useState([]); // Array of strings

  const handleSubmit = async (e) => {
    e.preventDefault();

    const webseriesData = {
      webseries_title,
      webseries_id,
      description,
      director,
      cast,
      release_date,
      languages,
      country,
      age_rating,
      thumbnail_url,
      trailer_url,
      availability_status,
      genres,
    };

    try {
      // Ensure you have correct environment variables set in .env
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
        webseries_id,
        webseriesData
      );
      console.log("Web series details added successfully!");
      // Optionally reset the form
    } catch (error) {
      console.error("Error adding web series details:", error);
      alert("Failed to add web series details. Please try again.");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div>
        <div className="form-container">
          <h2>Add Web Series Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={webseries_title}
              onChange={(e) => setWebseries_title(e.target.value)}
              placeholder="Web Series Title"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              placeholder="Director"
              required
            />
            <input
              type="text"
              value={cast.join(",")} // Display as comma-separated values
              onChange={(e) =>
                setCast(e.target.value.split(",").map((item) => item.trim()))
              } // Convert back to array
              placeholder="Cast (comma-separated)"
              required
            />
            <input
              type="datetime-local" // Input type for date and time
              value={release_date}
              onChange={(e) => setReleaseDate(e.target.value)}
              placeholder="Release Date"
              required
            />
            <input
              type="text"
              value={languages.join(",")} // Display as comma-separated values
              onChange={(e) =>
                setLanguages(
                  e.target.value.split(",").map((item) => item.trim())
                )
              } // Convert back to array
              placeholder="Languages (comma-separated)"
              required
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
            <input
              type="text"
              value={age_rating}
              onChange={(e) => setAgeRating(e.target.value)}
              placeholder="Age Rating"
              required
            />
            <input
              type="url"
              value={thumbnail_url}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="Thumbnail URL"
              required
            />
            <input
              type="url"
              value={trailer_url}
              onChange={(e) => setTrailerUrl(e.target.value)}
              placeholder="Trailer URL"
              required
            />

            <div>
              <label className="custom-checkbox-label">
                Availability Status
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  checked={availability_status}
                  onChange={(e) => setAvailabilityStatus(e.target.checked)}
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

            <input
              type="text"
              value={genres.join(",")} // Display as comma-separated values
              onChange={(e) =>
                setGenres(e.target.value.split(",").map((item) => item.trim()))
              } // Convert back to array
              placeholder="Genres (comma-separated)"
              required
            />
            <button type="submit">Add Web Series</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WebSeriesCreate;
