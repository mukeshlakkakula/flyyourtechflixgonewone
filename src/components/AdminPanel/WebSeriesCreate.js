import React, { useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { v4 as uuidv4 } from "uuid";
import AdminNavbar from "./AdminNavbar";

const WebSeriesCreate = () => {
  const [webseries_id, setWebseries_id] = useState(uuidv4().slice(0, 36)); // Ensure it's within 36 chars
  const [webseries_title, setWebseries_title] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const webseriesData = {
      webseries_title: webseries_title,
      webseries_id: formatCollectionId(webseries_id),
    };

    function formatCollectionId(id) {
      // Remove invalid characters (keep only a-z, A-Z, 0-9, _)
      let validId = id.replace(/[^a-zA-Z0-9_]/g, "");

      // Ensure it fits the 36-character constraint
      if (validId.length > 36) {
        validId = validId.slice(0, 36);
      }

      // Ensure it doesn't start with an underscore
      if (validId.startsWith("_")) {
        validId = validId.slice(1);
      }

      return validId;
    }

    try {
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
        formatCollectionId(webseries_id), // Use webseries_id as the document ID
        webseriesData
      );
      console.log("Movie details added successfully!");
      // Reset the form or handle further logic
    } catch (error) {
      console.error("Error adding movie details:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div>
        <div className="form-container">
          <h2>Add Movie Details</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={webseries_title}
              onChange={(e) => setWebseries_title(e.target.value)}
              placeholder="Movie Name"
              required
            />
            <input
              type="text"
              value={webseries_id}
              readOnly
              placeholder="Movie ID (Unique)"
            />

            <button type="submit">Add Movie</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default WebSeriesCreate;
