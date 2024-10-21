import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import sampleBg from "../../img/home/home__bg2.jpg";
import Navbar from "../Pages/navbar";
import ExpectedPremier from "../Pages/ExpectedPremier";
import Footer from "../Pages/Footer";

const AllMovies = () => {
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
                  {/* filter item */}
                  <div className="filter__item" id="filter__genre">
                    <span className="filter__item-label">GENRE:</span>
                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="navigation"
                      id="filter-genre"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <input type="button" defaultValue="Action/Adventure" />
                      <span />
                    </div>
                    <ul
                      className="filter__item-menu dropdown-menu scrollbar-dropdown"
                      aria-labelledby="filter-genre"
                    >
                      <li>Action/Adventure</li>
                      <li>Animals</li>
                      <li>Animation</li>
                      <li>Biography</li>
                      <li>Comedy</li>
                      <li>Cooking</li>
                      <li>Dance</li>
                      <li>Documentary</li>
                      <li>Drama</li>
                      <li>Education</li>
                      <li>Entertainment</li>
                      <li>Family</li>
                      <li>Fantasy</li>
                      <li>History</li>
                      <li>Horror</li>
                      <li>Independent</li>
                      <li>International</li>
                      <li>Kids</li>
                      <li>Kids &amp; Family</li>
                      <li>Medical</li>
                      <li>Military/War</li>
                      <li>Music</li>
                      <li>Musical</li>
                      <li>Mystery/Crime</li>
                      <li>Nature</li>
                      <li>Paranormal</li>
                      <li>Politics</li>
                      <li>Racing</li>
                      <li>Romance</li>
                      <li>Sci-Fi/Horror</li>
                      <li>Science</li>
                      <li>Science Fiction</li>
                      <li>Science/Nature</li>
                      <li>Spanish</li>
                      <li>Travel</li>
                      <li>Western</li>
                    </ul>
                  </div>
                  {/* end filter item */}
                  {/* filter item */}
                  <div className="filter__item" id="filter__quality">
                    <span className="filter__item-label">QUALITY:</span>
                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="navigation"
                      id="filter-quality"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <input type="button" defaultValue="HD 1080" />
                      <span />
                    </div>
                    <ul
                      className="filter__item-menu dropdown-menu scrollbar-dropdown"
                      aria-labelledby="filter-quality"
                    >
                      <li>HD 1080</li>
                      <li>HD 720</li>
                      <li>DVD</li>
                      <li>TS</li>
                    </ul>
                  </div>
                  {/* end filter item */}
                  {/* filter item */}
                  <div className="filter__item" id="filter__rate">
                    <span className="filter__item-label">IMBd:</span>
                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="button"
                      id="filter-rate"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <div className="filter__range">
                        <div id="filter__imbd-start" />
                        <div id="filter__imbd-end" />
                      </div>
                      <span />
                    </div>
                    <div
                      className="filter__item-menu filter__item-menu--range dropdown-menu"
                      aria-labelledby="filter-rate"
                    >
                      <div id="filter__imbd" />
                    </div>
                  </div>
                  {/* end filter item */}
                  {/* filter item */}
                  <div className="filter__item" id="filter__year">
                    <span className="filter__item-label">RELEASE YEAR:</span>
                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="button"
                      id="filter-year"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <div className="filter__range">
                        <div id="filter__years-start" />
                        <div id="filter__years-end" />
                      </div>
                      <span />
                    </div>
                    <div
                      className="filter__item-menu filter__item-menu--range dropdown-menu"
                      aria-labelledby="filter-year"
                    >
                      <div id="filter__years" />
                    </div>
                  </div>
                  {/* end filter item */}
                </div>
                {/* filter btn */}
                <button className="filter__btn" type="button">
                  apply filter
                </button>
                {/* end filter btn */}
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
