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
  const [imdb_rating, setImdbRating] = useState(0.0);
  const [age_rating, setAgeRating] = useState("");
  const [thumbnail_url, setThumbnailUrl] = useState("");
  const [trailer_url, setTrailerUrl] = useState("");
  const [availability_status, setAvailabilityStatus] = useState(false); // Boolean
  const [genres, setGenres] = useState([]); // Array of strings

  // season details starts here
  // season details
  const [webseriesSeasons, setWebseriesSeasons] = useState([
    {
      season_id: uuidv4(),
      season_number: 1,
      webEpisodes: [],
      season_imdb_rating: parseFloat(0.0),
    },
  ]);

  // Handle adding new seasons
  const handleAddSeason = () => {
    setWebseriesSeasons([
      ...webseriesSeasons,
      {
        season_id: uuidv4(),
        season_number: parseInt(webseriesSeasons.length + 1),
        webEpisodes: [],
        season_imdb_rating: parseFloat(0.0),
      },
    ]);
  };

  // Handle removing seasons
  const handleRemoveSeason = (index) => {
    const newSeasons = webseriesSeasons.filter((_, i) => i !== index);
    setWebseriesSeasons(newSeasons);
  };

  // Handle changing season data
  const handleSeasonChange = (index, event) => {
    let { name, value } = event.target;
    // Convert value to float if it's the "season_imdb_rating" field
    if (name === "season_imdb_rating") {
      value = parseFloat(value); // Convert string to float
    }

    // Convert value to integer if it's a number field like "season_number"
    if (name === "season_number") {
      value = parseInt(value, 10); // Convert string to integer
    }

    const newSeasons = [...webseriesSeasons];
    newSeasons[index][name] = value;

    setWebseriesSeasons(newSeasons);
  };
  // Handle adding new episodes to a specific season
  const handleAddEpisode = (seasonIndex) => {
    const newSeasons = [...webseriesSeasons];
    newSeasons[seasonIndex].webEpisodes.push({
      episode_id: uuidv4(),
      episode_title: "",
      episode_number: parseInt(newSeasons[seasonIndex].webEpisodes.length + 1),
      duration: 0,
      "480p": "",
      "720p": "",
      "1080p": "",
      highest_quality: "",
    });
    setWebseriesSeasons(newSeasons);
  };

  // Handle removing an episode from a specific season
  const handleRemoveEpisode = (seasonIndex, episodeIndex) => {
    const newSeasons = [...webseriesSeasons];
    newSeasons[seasonIndex].webEpisodes = newSeasons[
      seasonIndex
    ].webEpisodes.filter((_, i) => i !== episodeIndex);
    setWebseriesSeasons(newSeasons);
  };

  // Handle changing episode data for a specific season
  const handleEpisodeChange = (seasonIndex, episodeIndex, event) => {
    const { name, value } = event.target;
    const newSeasons = [...webseriesSeasons];
    newSeasons[seasonIndex].webEpisodes[episodeIndex][name] = value;
    setWebseriesSeasons(newSeasons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("started sending data");
    const processedSeasons = webseriesSeasons.map((season) => ({
      ...season,
      webEpisodes: season.webEpisodes.map((episode) => ({
        ...episode,
        episode_number: parseInt(episode.episode_number, 10), // Ensure episode_number is an integer
        duration: parseInt(episode.duration, 10), // Ensure duration is an integer
      })),
    }));

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
      imdb_rating: parseFloat(imdb_rating),
      trailer_url,
      availability_status,
      genres,
      webseriesSeasons: processedSeasons,
    };

    try {
      // Ensure you have correct environment variables set in .env
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
        webseries_id,
        webseriesData
      );
      alert("Web series details added successfully!");
      console.log("Web series details added successfully!");

      // Reset the form fields
      setWebseries_id(uuidv4());
      setWebseries_title("");
      setDescription("");
      setDirector("");
      setCast([]);
      setReleaseDate("");
      setLanguages([]);
      setCountry("");
      setAgeRating("");
      setThumbnailUrl("");
      setTrailerUrl("");
      setImdbRating(0.0);
      setAvailabilityStatus(false);
      setGenres([]);
      setWebseriesSeasons([
        {
          season_id: uuidv4(),
          season_number: 1,
          webEpisodes: [],
          season_imdb_rating: parseFloat(0.0),
        },
      ]); // Reset seasons to initial state

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

            {/* //season input from here */}
            {/* Seasons Input */}
            <h3>Seasons</h3>
            {webseriesSeasons.map((season, seasonIndex) => (
              <div key={season.season_id}>
                <input
                  type="text"
                  name="season_id"
                  value={season.season_id}
                  readOnly
                  placeholder="Season ID (Unique)"
                />
                <input
                  type="number"
                  name="season_number"
                  value={season.season_number}
                  onChange={(event) => handleSeasonChange(seasonIndex, event)}
                  placeholder="Season Number"
                  required
                />

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="season_imdb_rating"
                  value={season.season_imdb_rating}
                  onChange={(event) => handleSeasonChange(seasonIndex, event)}
                  placeholder="IMDb Rating (e.g., 8.5)"
                  required
                />
                {/* Episodes Input */}
                <h4>Episodes</h4>
                {season.webEpisodes.map((episode, episodeIndex) => (
                  <div key={episode.episode_id}>
                    <input
                      type="text"
                      name="episode_id"
                      value={episode.episode_id}
                      readOnly
                      placeholder="Episode ID (Unique)"
                    />
                    <input
                      type="text"
                      name="episode_title"
                      value={episode.episode_title}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="Episode Title"
                      required
                    />
                    <input
                      type="number"
                      name="episode_number"
                      value={episode.episode_number}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="Episode Number"
                      required
                    />
                    <input
                      type="number"
                      name="duration"
                      value={episode.duration}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="Duration (in minutes)"
                      required
                    />
                    <input
                      type="url"
                      name="480p"
                      value={episode["480p"]}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="480p URL"
                    />
                    <input
                      type="url"
                      name="720p"
                      value={episode["720p"]}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="720p URL"
                    />
                    <input
                      type="url"
                      name="1080p"
                      value={episode["1080p"]}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="1080p URL"
                    />
                    <input
                      type="text"
                      name="highest_quality"
                      value={episode.highest_quality}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="Highest Quality"
                    />
                    <button
                      type="button"
                      className="bg-danger"
                      onClick={() =>
                        handleRemoveEpisode(seasonIndex, episodeIndex)
                      }
                    >
                      Remove Episode
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddEpisode(seasonIndex)}
                >
                  Add Another Episode
                </button>
                <hr />
                <button
                  type="button"
                  className="bg-danger"
                  onClick={() => handleRemoveSeason(seasonIndex)}
                >
                  Remove Season
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddSeason}>
              Add Another Season
            </button>

            {/* //season input to here */}
            <hr />
            <button type="submit">Add Web Series</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WebSeriesCreate;
