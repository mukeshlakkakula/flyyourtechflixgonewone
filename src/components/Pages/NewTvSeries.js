import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";
import { Link, useNavigate } from "react-router-dom";
import sampleBg from "../../img/home/home__bg2.jpg";

const NewTvSeries = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const handleMovieClick = (movie_id) => {
    navigate(`/moviedetails/${movie_id}`); // Navigate to the movie details view
  };
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
        process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
        [
          Query.orderDesc("release_date"),
          // Sort by release_date in descending order
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
  if (apiStatus === apiStatusConstants.success) {
    console.log(movies[0], apiStatus);
    console.log("newrelease", movies[1], apiStatus, movies);
  }
  return (
    <div className="d-flex flex-wrap">
      {movies.map((each, index) => (
        <Link
          to={`/webseriesdetails/${each.webseries_id}`}
          className="col-6 col-sm-4 col-lg-3 col-xl-2"
          key={index}
        >
          <div className="card p-0">
            <div className="card__cover">
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
            <div className="card__content">
              <h3 className="card__title">
                <a href="#">
                  {apiStatus === apiStatusConstants.success
                    ? each.webseries_title
                    : sampleBg}
                </a>
              </h3>
              <span className="card__category">
                {" "}
                {apiStatus === apiStatusConstants.success ? (
                  each.genres.map((each, index) => <a key={index}>{each}</a>)
                ) : (
                  <a>cast</a>
                )}{" "}
              </span>
              <span className="card__rate">
                <i className="icon ion-ios-star"></i>
                {apiStatus === apiStatusConstants.success
                  ? each.imdb_rating
                  : sampleBg}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewTvSeries;
