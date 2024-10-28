//navbar import Starts fromm here
import React, { useState, useEffect, useContext } from "react";
import noImage from "../MovieDetailsPages/no_image_found.jpg.png";
//importing context
import Footer from "./Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";

import MyIcon from "../Images/logo.svg";

import "./Navbar.css";
//Navbar imports ends to here

//all movies immport from here

import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";

import { Audio } from "react-loader-spinner";

import sampleBg from "../../img/home/home__bg2.jpg";
//all movies ends to here
const SearchAll = () => {
  //navbar starts fromm here

  const [navSearch, setNavSearch] = useState("");
  //   const sendSearchText = () => {
  //     setSearchText(navSearch);
  //   };
  console.log("navSearch", navSearch);
  const handleSearchChange = (e) => {
    setNavSearch(e.target.value);
  };

  //handles search here

  const [isMenuActive, setMenuActive] = useState(false);
  const [isSearchActive, setSearchActive] = useState(true);
  const location = useLocation();
  const toggleMenu = () => {
    setMenuActive(!isMenuActive);

    // Ensure search is deactivated if menu is activated
    if (isSearchActive) {
      setSearchActive(false);
    }
  };
  console.log("isSearchActive", isSearchActive);
  const navigate = useNavigate();
  const toggleSearch = () => {
    setSearchActive(!isSearchActive);

    console.log("navigat", navigate, isSearchActive);
    // Ensure menu is deactivated if search is activated
    if (isMenuActive) {
      setMenuActive(false);
    }
  };
  console.log("searchAtive", isSearchActive, "menuActive", isMenuActive);
  //nav bar ends here

  // all movies starts from here
  const [movies, setMovies] = useState([]);

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
  console.log("apiInitial", apiStatus);
  const fetchMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        [
          Query.limit(20),

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

  const fetchFilteredMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    // Initialize an array for query conditions

    // Add genre filter if a genre is selected and not "ALL"

    const searchQuery =
      navSearch !== "" ? Query.contains("movie_title", navSearch) : null;
    const limitMovies = Query.limit[20];
    // Build the queries array, filtering out null values
    const queries = [
      ...(searchQuery ? [searchQuery] : []),
      ...(limitMovies ? [limitMovies] : []),
      // Use yearFilterQuery directly as an array
      // Add any additional queries here
    ];
    console.log("queriesMovie", queries, navSearch, searchQuery);
    try {
      // Fetch movies with applied filters
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        queries
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
  //all movies ends here

  //all webseries from here
  const [webseries, setwebseries] = useState([]);

  const apiwebseriesStatusConstants = {
    initial: "INITAIL",
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
  };
  const [apiwebseriesStatus, setwebseriesApiStatus] = useState(
    apiwebseriesStatusConstants.initial
  );

  const fetchwebseries = async () => {
    setwebseriesApiStatus(apiwebseriesStatusConstants.inProgress);
    try {
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
        [
          Query.limit(20),
          // Sort by release_date in descending order
        ]
      );
      setwebseries(response.documents);
      setwebseriesApiStatus(apiwebseriesStatusConstants.success);
    } catch (error) {
      console.error("Error fetching webseries:", error);
      setwebseriesApiStatus(apiwebseriesStatusConstants.failure);
    }
  };

  const fetchFilteredwebseries = async () => {
    setwebseriesApiStatus(apiwebseriesStatusConstants.inProgress);

    // Initialize an array for query conditions

    // Add genre filter if a genre is selected and not "ALL"

    const searchwebseriesQuery =
      navSearch !== "" ? Query.contains("webseries_title", navSearch) : null;

    const limitSearch = Query.limit[20];

    // Build the queries array, filtering out null values
    const webseriesqueries = [
      ...(searchwebseriesQuery ? [searchwebseriesQuery] : []),
      ...(limitSearch ? [limitSearch] : []),
      // Use yearFilterQuery directly as an array
      // Add any additional queries here
    ];
    console.log(
      "queriesMovie",
      webseriesqueries,
      navSearch,
      searchwebseriesQuery
    );
    try {
      // Fetch movies with applied filters
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
        webseriesqueries
      );

      setwebseries(response.documents);
      setwebseriesApiStatus(apiwebseriesStatusConstants.success);
    } catch (error) {
      console.error("Error fetching webseries:", error);
      setwebseriesApiStatus(apiwebseriesStatusConstants.failure);
    }
  };
  useEffect(() => {
    fetchwebseries();
  }, []);
  if (apiwebseriesStatus === apiwebseriesStatusConstants.success) {
    console.log("webseries", webseries, apiwebseriesStatus);
    console.log("newrelease", webseries[1], apiwebseriesStatus, webseries);
  }
  //all webseries ends here

  const applySearchBtn = () => {
    if (navSearch !== "") {
      fetchFilteredMovies();
      fetchFilteredwebseries();
    } else {
      fetchMovies();
      fetchwebseries();
    }
  };

  console.log("apistatus", apiStatus);

  const noImageFound =
    apiStatus !== "INPROGRESS" ? (
      <div className="w-100 d-flex text-center m-auto justify-content-center flex-column align-items-center">
        <img className="rounded w-25" src={noImage} alt="No Result" />
        <h4 className="text-light">No item Found...</h4>
      </div>
    ) : (
      <div className="loaderContainer">
        <Audio color="white" />
      </div>
    );

  const noWebseriesImageFound =
    apiwebseriesStatus !== "INPROGRESS" ? (
      <div className="w-100 d-flex text-center m-auto justify-content-center flex-column align-items-center">
        <img className="rounded w-25" src={noImage} alt="No Result" />
        <h4 className="text-light">No item Found...</h4>
      </div>
    ) : (
      <div className="loaderContainer">
        <Audio color="white" />
      </div>
    );
  return (
    <div>
      {" "}
      <>
        {/* Hello world */}
        <header className="header">
          <div className="header__wrap">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="header__content">
                    {/* header logo */}
                    <Link to="/" href="index.html" className="header__logo">
                      <img src={MyIcon} alt="" />
                    </Link>
                    {/* end header logo */}
                    {/* header nav */}

                    <ul
                      className={`header__nav ${
                        isMenuActive ? "header__nav--active" : ""
                      }`}
                    >
                      {/* dropdown */}
                      <li className="header__nav-item">
                        <Link to="/">
                          <button
                            className={
                              location.pathname === "/"
                                ? "header__nav-link header__nav-link--active"
                                : "header__auth header__nav-link"
                            }
                          >
                            Home
                          </button>
                        </Link>
                      </li>
                      {/* end dropdown */}
                      {/* dropdown */}
                      <li className="header__nav-item">
                        <Link to="/movies">
                          <button
                            className={
                              location.pathname === "/movies"
                                ? "header__nav-link header__nav-link--active"
                                : "header__auth header__nav-link"
                            }
                          >
                            Movies
                          </button>
                        </Link>
                      </li>
                      {/* end dropdown */}
                      <li className="header__nav-item ">
                        <Link to="/webseries">
                          <button
                            className={
                              location.pathname === "/webseries"
                                ? "header__nav-link header__nav-link--active"
                                : "header__auth header__nav-link"
                            }
                          >
                            Webseries
                          </button>
                        </Link>
                      </li>

                      {/* dropdown */}

                      {/* end dropdown */}
                    </ul>
                    {/* end header nav */}
                    {/* header auth */}
                    <div className="header__auth">
                      <button
                        className={`header__search-btn ${
                          isSearchActive ? "active" : ""
                        }`}
                        onClick={toggleSearch}
                        type="button"
                      >
                        <i className="icon ion-ios-search" />
                      </button>
                    </div>
                    {/* end header auth */}
                    {/* header menu btn */}
                    <button
                      className={`header__btn ${
                        isMenuActive ? "header__btn--active" : ""
                      }`}
                      onClick={toggleMenu}
                      type="button"
                    >
                      <span />
                      <span />
                      <span />
                    </button>
                    {/* end header menu btn */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* header search */}
          <form
            action="#"
            className={`header__search ${
              isSearchActive ? "header__search--active" : ""
            }`}
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="header__search-content">
                    <input
                      type="text"
                      value={navSearch}
                      onChange={handleSearchChange}
                      placeholder="Search for a movie, TV Series that you are looking for"
                    />
                    <button type="button" onClick={applySearchBtn}>
                      search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/* end header search */}
        </header>
      </>
      <section className="home container">
        <h4 className="text-light">Movies</h4>

        <div className="d-flex flex-wrap p-0">
          {movies.length > 0 ? resultView : noImageFound}
        </div>

        <hr className="text-light" />
        <h4 className="text-light">Web Series</h4>
        <div className="d-flex flex-wrap p-0">
          <>
            {webseries.length > 0 ? (
              apiwebseriesStatus === apiwebseriesStatusConstants.success ? (
                webseries.map((each, index) => (
                  <Link
                    to={`/webseriesdetails/${each.webseries_id}`}
                    className="col-6 col-sm-4 col-lg-3 col-xl-2"
                    key={index}
                  >
                    <div className="card p-0">
                      <div className="card__cover">
                        <img
                          src={
                            apiwebseriesStatus ===
                            apiwebseriesStatusConstants.success
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
                            {apiwebseriesStatus ===
                            apiwebseriesStatusConstants.success
                              ? each.webseries_title
                              : sampleBg}
                          </a>
                        </h3>
                        <span className="card__category">
                          {" "}
                          {apiwebseriesStatus ===
                          apiwebseriesStatusConstants.success ? (
                            each.genres.map((each, index) => (
                              <a key={index}>{each}</a>
                            ))
                          ) : (
                            <a>cast</a>
                          )}{" "}
                        </span>
                        <span className="card__rate">
                          <i className="icon ion-ios-star"></i>
                          {apiwebseriesStatus ===
                          apiwebseriesStatusConstants.success
                            ? each.imdb_rating
                            : sampleBg}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="loaderContainer">
                  <Audio color="white" />
                </div>
              )
            ) : (
              noWebseriesImageFound
            )}
          </>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SearchAll;
