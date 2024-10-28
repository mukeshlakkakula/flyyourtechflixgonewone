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
            <label htmlFor="webseries_title">Web Series Title</label>
            <input
              type="text"
              value={webseries_title}
              onChange={(e) => setWebseries_title(e.target.value)}
              placeholder="Web Series Title"
              required
            />{" "}
            <label htmlFor="description">Description</label>
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
            />{" "}
            <label htmlFor="director">Director</label>
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              placeholder="Director"
              required
            />
            <label htmlFor="cast">Cast (comma-separated)</label>
            <input
              type="text"
              value={cast.join(",")} // Display as comma-separated values
              onChange={(e) =>
                setCast(e.target.value.split(",").map((item) => item.trim()))
              } // Convert back to array
              placeholder="Cast (comma-separated)"
              required
            />{" "}
            <label htmlFor="release_date">Release Date</label>
            <input
              type="date" // Input type for date and time
              value={release_date}
              className="p-2 rounded"
              onChange={(e) => setReleaseDate(e.target.value)}
              placeholder="Release Date"
              required
            />{" "}
            <hr />
            <label htmlFor="languages">Languages (comma-separated)</label>
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
            <label htmlFor="country">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
            />
            <label htmlFor="age_rating">Age Rating</label>
            <input
              type="text"
              value={age_rating}
              onChange={(e) => setAgeRating(e.target.value)}
              placeholder="Age Rating"
              required
            />
            <label htmlFor="thumbnail_url">Thumbnail URL</label>
            <input
              type="url"
              value={thumbnail_url}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="Thumbnail URL"
              required
            />{" "}
            <label htmlFor="trailer_url">Trailer URL</label>
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
            </div>{" "}
            <label htmlFor="genres">Genres (comma-separated)</label>
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
            <h2>Seasons</h2>
            {webseriesSeasons.map((season, seasonIndex) => (
              <div key={season.season_id}>
                {" "}
                <label htmlFor={`season_id_${seasonIndex}`}>
                  Season ID (Unique)
                </label>
                <input
                  type="text"
                  name="season_id"
                  value={season.season_id}
                  readOnly
                  placeholder="Season ID (Unique)"
                />
                <label htmlFor={`season_number_${seasonIndex}`}>
                  Season Number
                </label>
                <input
                  type="number"
                  name="season_number"
                  value={season.season_number}
                  onChange={(event) => handleSeasonChange(seasonIndex, event)}
                  placeholder="Season Number"
                  required
                />
                <label htmlFor={`season_imdb_rating_${seasonIndex}`}>
                  Season IMDb Rating
                </label>
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
                <h2>Episodes</h2>
                {season.webEpisodes.map((episode, episodeIndex) => (
                  <div key={episode.episode_id}>
                    <label
                      htmlFor={`episode_id_${seasonIndex}_${episodeIndex}`}
                    >
                      Episode ID (Unique)
                    </label>
                    <input
                      type="text"
                      name="episode_id"
                      value={episode.episode_id}
                      readOnly
                      placeholder="Episode ID (Unique)"
                    />
                    <label
                      htmlFor={`episode_title_${seasonIndex}_${episodeIndex}`}
                    >
                      Episode Title
                    </label>
                    <input
                      type="text"
                      name="episode_title"
                      value={episode.episode_title}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="Episode Title"
                      required
                    />{" "}
                    <label
                      htmlFor={`episode_number_${seasonIndex}_${episodeIndex}`}
                    >
                      Episode Number
                    </label>
                    <input
                      type="number"
                      name="episode_number"
                      value={episode.episode_number}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="Episode Number"
                      required
                    />{" "}
                    <label htmlFor={`duration_${seasonIndex}_${episodeIndex}`}>
                      Duration (in minutes)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={episode.duration}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="Duration (in minutes)"
                      required
                    />{" "}
                    <label htmlFor={`480p_${seasonIndex}_${episodeIndex}`}>
                      480p URL
                    </label>
                    <input
                      type="url"
                      name="480p"
                      value={episode["480p"]}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="480p URL"
                    />{" "}
                    <label htmlFor={`720p_${seasonIndex}_${episodeIndex}`}>
                      720p URL
                    </label>
                    <input
                      type="url"
                      name="720p"
                      value={episode["720p"]}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="720p URL"
                    />{" "}
                    <label htmlFor={`1080p_${seasonIndex}_${episodeIndex}`}>
                      1080p URL
                    </label>
                    <input
                      type="url"
                      name="1080p"
                      value={episode["1080p"]}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
                      placeholder="1080p URL"
                    />
                    <label>Highest Video Quality</label>
                    <select
                      name="highest_quality"
                      className="p-1 rounded mb-1 bg-dark text-light"
                      value={episode.highest_quality}
                      onChange={(event) =>
                        handleEpisodeChange(seasonIndex, episodeIndex, event)
                      }
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
                    <br />
                    <button
                      type="button"
                      className="bg-danger w-50  mt-1"
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
                  className="w-50"
                  onClick={() => handleAddEpisode(seasonIndex)}
                >
                  Add Another Episode
                </button>
                <hr />
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="bg-danger w-50"
                    onClick={() => handleRemoveSeason(seasonIndex)}
                  >
                    Remove Season
                  </button>
                </div>
                <hr />
              </div>
            ))}
            <div className="d-flex justify-content-center">
              <button type="button" className="w-50" onClick={handleAddSeason}>
                Add Another Season
              </button>
            </div>
            {/* //season input to here */}
            <hr />
            <div className="d-flex justify-content-center">
              <button type="submit" className="w-50">
                Add Web Series to server
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WebSeriesCreate;
