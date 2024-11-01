import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";
import { Link, useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

import sampleBg from "../../img/home/home__bg2.jpg";

const NewItemMovies = () => {
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
  // console.log("apiInitial", apiStatus);
  const fetchMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        [
          Query.limit(6),
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
  // if (apiStatus === apiStatusConstants.success) {
  //   console.log(movies[0], apiStatus);
  //   console.log("newrelease", movies[1], apiStatus, movies);
  // }

  let resultView = "";
  switch (apiStatus) {
    case apiStatusConstants.success:
      resultView = movies.map((each, index) => (
        <div
          className="col-6 col-sm-4 col-lg-3 col-xl-2"
          key={index}
          onClick={() => handleMovieClick(each.movie_id)}
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
                <i className="icon ion-ios-play" />
              </a>
            </div>
            <div className="card__content">
              <h3 className="card__title">
                <a href="#">{each.movie_title}</a>
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
                <i className="icon ion-ios-star" />
                {each.imdb_rating}
              </span>
            </div>
          </div>
        </div>
      ));
      break;

    case apiStatusConstants.inProgress:
      resultView = (
        <div className="loaderContainer">
          <Audio color="white" />
        </div>
      );
      break;
    case apiStatusConstants.failure:
      resultView = <h1>Something went wrong Pleace try again ....</h1>;
      break;
    default:
      resultView = null;
  }

  return (
    <div className="d-flex flex-wrap p-0">
      {" "}
      {resultView}
      <div className="col-12">
        <Link to="/movies#" className="section__btn">
          Show more
        </Link>
      </div>{" "}
    </div>
  );
};

export default NewItemMovies;
