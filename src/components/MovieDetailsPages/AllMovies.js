import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";

import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import sampleBg from "../../img/home/home__bg2.jpg";
import Navbar from "../Pages/navbar";
import ExpectedPremier from "../Pages/ExpectedPremier";
import Footer from "../Pages/Footer";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  // filter element starts from here

  const [selectedGenre, setSelectedGenre] = useState("Action/Adventure");
  const [selectedQuality, setSelectedQuality] = useState("HD 1080");
  const [selectedIMBd, setSelectedIMBd] = useState({ start: "", end: "" });
  const [selectedYear, setSelectedYear] = useState({ start: "", end: "" });

  // Genre list
  const genreList = [
    "Action/Adventure",
    "Animals",
    "Animation",
    "Biography",
    "Comedy",
    "Cooking",
    "Dance",
    "Documentary",
    "Drama",
    "Education",
    "Entertainment",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Independent",
    "International",
    "Kids",
    "Kids & Family",
    "Medical",
    "Military/War",
    "Music",
    "Musical",
    "Mystery/Crime",
    "Nature",
    "Paranormal",
    "Politics",
    "Racing",
    "Romance",
    "Sci-Fi/Horror",
    "Science",
    "Science Fiction",
    "Science/Nature",
    "Spanish",
    "Travel",
    "Western",
  ];

  // Quality list
  const qualityList = ["HD 1080", "HD 720", "DVD", "TS"];

  // Handle genre change
  const handleGenreChange = (text) => {
    setSelectedGenre(text);
  };

  // Handle quality change
  const handleQualityChange = (text) => {
    setSelectedQuality(text);
  };

  // Handle filter apply (dummy function)
  const applyFilter = () => {
    // You can process filter selections here, such as making API calls with selected filters
    console.log("Filters applied: ", {
      selectedGenre,
      selectedQuality,
      selectedIMBd,
      selectedYear,
    });
  };
  // State to control the size of the dropdown

  const [isExpanded, setIsExpanded] = useState(false); // State to toggle dropdown size

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded); // Toggle between expanded and collapsed states
  };

  // filter ends here

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
  console.log("apiInitial", apiStatus);
  const fetchMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID
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
                <a href="#">
                  {" "}
                  {apiStatus === apiStatusConstants.success ? (
                    each.genres.map((each) => <a>{each}</a>)
                  ) : (
                    <a>cast</a>
                  )}{" "}
                </a>
              </span>
              <span className="card__rate">
                <i className="icon ion-ios-star" />
                8.4
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
    <>
      {/* header */}
      <Navbar />

      {/* end header */}
      {/* page title */}
      <section
        className="section section--first section--bg"
        data-bg="img/section/section.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                {/* section title */}
                <h2 className="section__title">Catalog grid</h2>
                {/* end section title */}
                {/* breadcrumb */}
                <ul className="breadcrumb">
                  <li className="breadcrumb__item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb__item breadcrumb__item--active">
                    Catalog grid
                  </li>
                </ul>
                {/* end breadcrumb */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end page title */}
      {/* filter */}
      <div className="filter">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="filter__content">
                <div className="filter__items">
                  {/* Filter for Genre */}
                  <div className="filter__item" id="filter__genre">
                    <span className="filter__item-label">GENRE:</span>

                    <select
                      value={selectedGenre}
                      id="options"
                      onClick={toggleDropdown}
                      onChange={(e) => {
                        setSelectedGenre(e.target.value);
                      }} // Toggle dropdown size on click
                      className={`custom-dropdown ${
                        isExpanded ? "expanded" : ""
                      }`}
                      style={{
                        width: "200px",
                        padding: "10px",
                        backgroundColor: "#2b2b31",
                        color: "#fff",
                        borderBottom: "2px solid #888",
                        borderRadius: "5px",

                        outline: "none",
                        cursor: "pointer",
                        appearance: "none",
                      }}
                    >
                      {genreList.map((genre, index) => (
                        <option
                          key={index}
                          value={genre}
                          onChange={() => handleGenreChange(genre)}
                        >
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* End Filter for Genre */}

                  {/* Filter for Quality */}
                  <div className="filter__item" id="filter__quality">
                    <span className="filter__item-label">QUALITY:</span>
                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="navigation"
                      id="filter-quality"
                    >
                      <input type="button" value={selectedQuality} readOnly />
                      <span />
                    </div>
                    <ul
                      className="filter__item-menu dropdown-menu scrollbar-dropdown"
                      aria-labelledby="filter-quality"
                    >
                      {qualityList.map((quality, index) => (
                        <li
                          key={index}
                          onClick={() => handleQualityChange(quality)}
                        >
                          {quality}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* End Filter for Quality */}

                  {/* Filter for IMBd */}
                  <div className="filter__item" id="filter__rate">
                    <span className="filter__item-label">IMBd:</span>
                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="button"
                      id="filter-rate"
                    >
                      <div className="filter__range">
                        <div id="filter__imbd-start">{selectedIMBd.start}</div>
                        <div id="filter__imbd-end">{selectedIMBd.end}</div>
                      </div>
                      <span />
                    </div>
                    <div className="filter__item-menu filter__item-menu--range dropdown-menu">
                      {/* You can add IMBd range slider or inputs here */}
                      <input
                        type="number"
                        placeholder="Start"
                        value={selectedIMBd.start}
                        onChange={(e) =>
                          setSelectedIMBd({
                            ...selectedIMBd,
                            start: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="End"
                        value={selectedIMBd.end}
                        onChange={(e) =>
                          setSelectedIMBd({
                            ...selectedIMBd,
                            end: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* End Filter for IMBd */}

                  {/* Filter for Year */}
                  <div className="filter__item" id="filter__year">
                    <span className="filter__item-label">RELEASE YEAR:</span>
                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="button"
                      id="filter-year"
                    >
                      <div className="filter__range">
                        <div id="filter__years-start">{selectedYear.start}</div>
                        <div id="filter__years-end">{selectedYear.end}</div>
                      </div>
                      <span />
                    </div>
                    <div className="filter__item-menu filter__item-menu--range dropdown-menu">
                      {/* Year range inputs */}
                      <input
                        type="number"
                        placeholder="Start"
                        value={selectedYear.start}
                        onChange={(e) =>
                          setSelectedYear({
                            ...selectedYear,
                            start: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="End"
                        value={selectedYear.end}
                        onChange={(e) =>
                          setSelectedYear({
                            ...selectedYear,
                            end: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  {/* End Filter for Year */}
                </div>

                {/* Filter Apply Button */}
                <button
                  className="filter__btn"
                  type="button"
                  onClick={applyFilter}
                >
                  Apply Filter
                </button>
                {/* End Filter Apply Button */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end filter */}
      {/* catalog */}
      <div className="catalog">
        <div className="container">
          <div className="row">
            {/* card */}
            {resultView}
            {/* end card */}
            {/* card */}

            {/* end card */}
            {/* paginator */}
            <div className="col-12">
              <ul className="paginator">
                <li className="paginator__item paginator__item--prev">
                  <a href="#">
                    <i className="icon ion-ios-arrow-back" />
                  </a>
                </li>
                <li className="paginator__item">
                  <a href="#">1</a>
                </li>
                <li className="paginator__item paginator__item--active">
                  <a href="#">2</a>
                </li>
                <li className="paginator__item">
                  <a href="#">3</a>
                </li>
                <li className="paginator__item">
                  <a href="#">4</a>
                </li>
                <li className="paginator__item paginator__item--next">
                  <a href="#">
                    <i className="icon ion-ios-arrow-forward" />
                  </a>
                </li>
              </ul>
            </div>
            {/* end paginator */}
          </div>
        </div>
      </div>
      {/* end catalog */}
      {/* expected premiere */}
      <ExpectedPremier />
      {/* end expected premiere */}
      {/* footer */}

      <Footer />
      {/* end footer */}
      {/* JS */}
    </>
  );
};

export default AllMovies;
