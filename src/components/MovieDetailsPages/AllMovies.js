import React, { useEffect, useState, useRef, useContext } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";
//import of year filter from here
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import "nouislider/dist/nouislider.css";

//import of year filter ends here
//importing search contxt here
import { SearchContext } from "../../context/SearchContext";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import sampleBg from "../../img/home/home__bg2.jpg";
import Navbar from "../Pages/navbar";
import ExpectedPremier from "../Pages/ExpectedPremier";
import Footer from "../Pages/Footer";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  //search Context here
  const { searchText } = useContext(SearchContext);
  // filter element starts from here

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");

  // Genre list
  const genreList = [
    "Action",
    "Adventure",
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
    "Military",
    "War",
    "Music",
    "Musical",
    "Mystery",
    "Crime",
    "Nature",
    "Paranormal",
    "Politics",
    "Racing",
    "Romance",
    "Sci-Fi",
    "Horror",
    "Science",
    "Science Fiction",
    "Science",
    "Nature",
    "Spanish",
    "Travel",
    "Western",
  ];

  // Quality list
  const qualityList = ["HD 1080", "HD 720", "DVD", "TS"];

  // Handle genre change

  console.log("filterForQual&genre", selectedGenre, selectedQuality);

  // Handle filter apply (dummy function)

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

  console.log("searchingText", searchText);
  useEffect(() => {
    fetchMovies();
  }, []);
  if (apiStatus === apiStatusConstants.success) {
    console.log(movies[0], apiStatus);
    console.log("newrelease", movies[1], apiStatus, movies);
  }

  //year range filter from here
  const sliderRef = useRef(null);
  const [range, setRange] = useState([1900, 2015]); // Initialize state for slider values
  const [startValue, setStartValue] = useState(range[0]);
  const [endValue, setEndValue] = useState(range[1]);

  useEffect(() => {
    if (sliderRef.current) {
      // Check if the slider has already been initialized
      if (sliderRef.current.noUiSlider) {
        // Destroy the existing slider before creating a new one
        sliderRef.current.noUiSlider.destroy();
      }

      // Create a new slider
      const cur_year = new Date().getFullYear();
      noUiSlider.create(sliderRef.current, {
        range: {
          min: 1900,
          max: cur_year,
        },
        step: 1,
        connect: true,
        start: [1900, cur_year],
        format: wNumb({
          decimals: 0,
        }),
      });

      const slider = sliderRef.current.noUiSlider;
      slider.on("update", (values, handle) => {
        const newRange = [...range]; // Copy current state
        newRange[handle] = parseInt(values[handle], 10); // Update the appropriate value

        // Update the state for the displayed values
        if (handle === 0) {
          setStartValue(newRange[handle]);
        } else if (handle === 1) {
          setEndValue(newRange[handle]);
        }

        // Also update the range state
        setRange(newRange);
      });
    }

    // Cleanup function to destroy the slider on unmount
    return () => {
      if (sliderRef.current && sliderRef.current.noUiSlider) {
        sliderRef.current.noUiSlider.destroy();
      }
    };
  }, []); // Run effect only on mount
  console.log("yearsted", startValue, endValue);

  //year range filter ends here

  //imdb filter starts from here
  const imdbSliderRef = useRef(null);
  const [imdbRange, setimdbRange] = useState([0, 10]); // Initialize state for slider values
  const [imdbStartVal, setimdbStartVal] = useState(imdbRange[0]);
  const [imdbEndval, setimdbEndval] = useState(imdbRange[1]);

  useEffect(() => {
    if (imdbSliderRef.current) {
      // Check if the slider has already been initialized
      if (imdbSliderRef.current.noUiSlider) {
        // Destroy the existing slider before creating a new one
        imdbSliderRef.current.noUiSlider.destroy();
      }

      // Create a new slider
      noUiSlider.create(imdbSliderRef.current, {
        range: {
          min: 0,
          max: 10,
        },
        step: 0.1,
        connect: true,
        start: [0, 10],
        format: wNumb({
          decimals: 1,
        }),
      });

      const slider = imdbSliderRef.current.noUiSlider;
      slider.on("update", (values, handle) => {
        const newimdbRange = [...imdbRange]; // Copy current state
        newimdbRange[handle] = parseInt(values[handle], 10); // Update the appropriate value

        // Update the state for the displayed values
        if (handle === 0) {
          setimdbStartVal(newimdbRange[handle]);
        } else if (handle === 1) {
          setimdbEndval(newimdbRange[handle]);
        }

        // Also update the imdbRange state
        setimdbRange(newimdbRange);
      });
    }

    // Cleanup function to destroy the slider on unmount
    return () => {
      if (imdbSliderRef.current && imdbSliderRef.current.noUiSlider) {
        imdbSliderRef.current.noUiSlider.destroy();
      }
    };
  }, []); // Run effect only on mount
  console.log("imdbSted", imdbStartVal, imdbEndval);
  //imdb filter ends here

  // filtered movies starts here
  let filteredMovies = [];

  if (apiStatus === apiStatusConstants.success) {
    filteredMovies = movies.filter((each) => {
      // Ensure that the movie title and searchText are not null or undefined
      const matchesTitle = each.movie_title
        ?.toLowerCase()
        .includes(searchText?.toLowerCase() || "");

      console.log(
        "matchesTitle",
        matchesTitle,
        "movie_title",
        each.movie_title,
        "searchText",
        searchText
      );

      // Check if the selectedGenre exists in the genres array
      const matchesGenre =
        selectedGenre !== ""
          ? each.genres?.some(
              (genre) => genre?.toLowerCase() === selectedGenre?.toLowerCase()
            )
          : true;

      console.log(
        "matchesGenre",
        matchesGenre,
        "selectedGenre",
        selectedGenre,
        "each.genres",
        each.genres,
        each
      );

      // Ensure selectedQuality and highest_video_quality are not undefined
      const matchQuality =
        selectedQuality !== ""
          ? each.highest_video_quality?.toLowerCase() ===
            selectedQuality?.toLowerCase()
          : true;

      console.log(
        "matchQuality",
        matchQuality,
        "each.highest_video_quality",
        each.highest_video_quality?.toLowerCase(),
        each,
        "selectedQuality",
        selectedQuality?.toLowerCase()
      );

      // Ensure imdb_rating is valid and within range
      const matchImdb =
        each.imdb_rating !== undefined &&
        each.imdb_rating <= imdbEndval &&
        each.imdb_rating >= imdbStartVal;

      // Ensure release_date exists and extract the year
      const dateObj = new Date(each.release_date);
      const yearMovie = dateObj.getFullYear();
      const matchYears = yearMovie >= startValue && yearMovie <= endValue;

      return (
        matchesTitle && matchesGenre && matchQuality && matchImdb && matchYears
      );
    });
  }

  let searchFilter = [];
  if (apiStatus === apiStatusConstants.success) {
    searchFilter = movies.filter((each) => {
      // Ensure that the movie title and searchText are not null or undefined
      each.movie_title.toLowerCase().includes(searchText?.toLowerCase());
    });

    console.log("searchFilter", searchFilter);
  }

  console.log("letFilter", filteredMovies);

  let resultView = "";
  switch (apiStatus) {
    case apiStatusConstants.success:
      resultView =
        filteredMovies.length > 1 ? (
          filteredMovies.map((each, index) => (
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
                    {each.imdb_rating}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-100 d-flex text-center m-auto justify-content-center">
            <img
              className="rounded w-25"
              src="https://i.pinimg.com/564x/89/39/06/893906d9df7228cc36e1b3679a0d1dac.jpg"
              alt="No Result"
            />
          </div>
        );
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
                        <option key={index}>{genre}</option>
                      ))}
                    </select>
                  </div>
                  {/* End Filter for Genre */}

                  {/* Filter for Quality */}
                  <div className="filter__item" id="filter__quality">
                    <span className="filter__item-label">QUALITY:</span>

                    <select
                      value={selectedQuality}
                      id="options"
                      onClick={toggleDropdown}
                      onChange={(e) => {
                        setSelectedQuality(e.target.value);
                      }} // Toggle dropdown size on click
                      className={`custom-dropdown ${
                        isExpanded ? "expanded" : ""
                      }`}
                      style={{
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
                      {qualityList.map((quality, index) => (
                        <option key={index}>{quality}</option>
                      ))}
                    </select>
                  </div>
                  {/* End Filter for Quality */}

                  {/* Filter for IMBd */}
                  <div>
                    <div className=" filter__item" id="filter__year">
                      <span className="filter__item-label">IMDB</span>
                      <div
                        className="filter__item-btn dropdown-toggle"
                        role="button"
                        id="filter-year"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <div className="filter__range">
                          <div>{imdbStartVal}</div>
                          <div>{imdbEndval}</div>
                        </div>
                        <span />
                      </div>
                      <div
                        className="filter__item-menu filter__item-menu--range dropdown-menu"
                        aria-labelledby="filter-year"
                      >
                        <div id="filter__years" />
                        <div id="filter__years" ref={imdbSliderRef}>
                          <div>
                            <span id="filter__years-start">{imdbStartVal}</span>{" "}
                            -<span id="filter__years-end">{imdbEndval}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Filter for IMBd */}

                  {/* Filter for Year */}
                  <div className=" filter__item" id="filter__year">
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
                        <div>{startValue}</div>
                        <div>{endValue}</div>
                      </div>
                      <span />
                    </div>
                    <div
                      className="filter__item-menu filter__item-menu--range dropdown-menu"
                      aria-labelledby="filter-year"
                    >
                      <div id="filter__years" />
                      <div id="filter__years" ref={sliderRef}>
                        <div>
                          <span id="filter__years-start">{startValue}</span> -
                          <span id="filter__years-end">{endValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* End Filter for Year */}
                </div>

                {/* Filter Apply Button */}
                <button className="filter__btn" type="button">
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
