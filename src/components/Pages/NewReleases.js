import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import sampleBg from "../../img/home/home__bg2.jpg";

const NewReleases = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const apiStatusConstants = {
    initial: "INITAIL",
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
  };
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const fetchMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        [
          Query.orderDesc("release_date"),
          Query.limit(6), // Sort by release_date in descending order
        ]
      );
      setMovies(response.documents);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  // if (apiStatus === apiStatusConstants.success) {
  //   console.log(movies[0], apiStatus);
  //   console.log("newrelease", movies[1], apiStatus, movies);
  // }

  const handleMovieClick = (movie_id) => {
    navigate(`/moviedetails/${movie_id}`); // Navigate to the movie details view
  };
  return (
    <div className="d-flex flex-wrap p-0">
      {apiStatus === apiStatusConstants.success ? (
        movies.map((each, index) => (
          <div
            onClick={() => handleMovieClick(each.movie_id)}
            key={index}
            className="col-6 col-sm-12 col-lg-6"
          >
            <div className="card card--list">
              <div className="row">
                <div className="col-12 col-sm-4 p-0">
                  <div className="card__cover " style={{ height: "100%" }}>
                    <img
                      src={
                        apiStatus === apiStatusConstants.success
                          ? each.thumbnail_url
                          : sampleBg
                      }
                      alt=""
                    />
                    <a href="#" className="card__play">
                      <i className="icon ion-ios-play"></i>
                    </a>
                  </div>
                </div>
                <div className="col-12 col-sm-8">
                  <div className="card__content pt-1">
                    <h3 className="card__title">
                      <a href="#">{each.movie_title}</a>
                    </h3>
                    <span className="card__category">
                      {" "}
                      {apiStatus === apiStatusConstants.success ? (
                        each.genres.map((each, index) => (
                          <a key={index}>{each}</a>
                        ))
                      ) : (
                        <a>cast</a>
                      )}{" "}
                    </span>
                    <div className="card__wrap">
                      <span className="card__rate">
                        <i className="icon ion-ios-star"></i> {each.imdb_rating}
                      </span>
                      <ul className="card__list">
                        <li>{each.highest_video_quality}</li>
                        <li>
                          {apiStatus === apiStatusConstants.success
                            ? each.age_rating
                            : sampleBg}
                        </li>
                      </ul>
                    </div>
                    <div className="card__description">
                      <p>
                        {apiStatus === apiStatusConstants.success
                          ? each.description
                          : sampleBg}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="loaderContainer">
          <Audio color="white" />
        </div>
      )}
    </div>
  );
};

export default NewReleases;
