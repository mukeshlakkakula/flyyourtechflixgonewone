import React, { useEffect, useState, useRef, useContext } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";
//import of year filter from here
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import "nouislider/dist/nouislider.css";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import noImage from "./no_image_found.jpg.png";

//import of year filter ends here
//importing search contxt here
import { SearchContext } from "../../context/SearchContext";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import sampleBg from "../../img/home/home__bg2.jpg";
import Navbar from "../Pages/navbar";
// import ExpectedPremier from "../Pages/ExpectedPremier";
import Footer from "../Pages/Footer";
// import AllWebseries from "../WebseriesDetailsPages/AllWebseries";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  //changes for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(20); // Customize number of movies per page
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);
  //search Context here
  const { searchText } = useContext(SearchContext);
  // filter element starts from here

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");

  const [applyFilter, setApplyFilter] = useState(true);

  // Genre list
  const genreList = [
    "ALL",
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
  const qualityList = ["ALL", "HD 1080", "HD 720", "DVD", "TS"];

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
  const fetchFilteredMovies = async (page = 1) => {
    setApiStatus(apiStatusConstants.inProgress);
    const skip = (page - 1) * moviesPerPage;

    // Initialize an array for query conditions

    // Add genre filter if a genre is selected and not "ALL"

    const genreQuery =
      selectedGenre && selectedGenre !== "ALL"
        ? Query.contains("genres", selectedGenre)
        : null;

    const selectedQualityQuery =
      selectedQuality && selectedQuality !== "ALL"
        ? Query.equal("highest_video_quality", selectedQuality)
        : null;

    const ImdbQuery = Query.and([
      Query.greaterThanEqual("imdb_rating", imdbStartVal),
      Query.lessThanEqual("imdb_rating", imdbEndval),
    ]);

    const startYearRangeValue = new Date(
      `${startValue}-01-01T00:00:00.000+00:00`
    ).toISOString(); // Start date in ISO format
    const endYearRangeValue = new Date(
      `${endValue}-12-31T23:59:59.999+00:00`
    ).toISOString(); // End date in ISO format

    const yearFilterQuery = [
      Query.between("release_date", startYearRangeValue, endYearRangeValue),
    ];

    // Build the queries array, filtering out null values
    const queries = [
      ...(genreQuery ? [genreQuery] : []),
      ...(selectedQualityQuery ? [selectedQualityQuery] : []),
      ...(ImdbQuery ? [ImdbQuery] : []),
      ...(yearFilterQuery.length > 0 ? yearFilterQuery : []), // Use yearFilterQuery directly as an array
      Query.limit(moviesPerPage), // Limit the number of movies per page
      Query.offset(skip), // Offset based on current page
      // Add any additional queries here
    ];
    console.log("queries", queries);
    try {
      // Fetch movies with applied filters
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        queries
      );

      setMovies(response.documents);
      setTotalMovies(response.total); // Store the total movies count for pagination
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };
  const fetchMovies = async (page = 1) => {
    setApiStatus(apiStatusConstants.inProgress);
    const skip = (page - 1) * moviesPerPage; // Calculate skip for pagination
    // Initialize an array for query conditions

    try {
      // Fetch movies with applied filters
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        [
          Query.orderDesc("release_date"),
          Query.limit(moviesPerPage), // Limit number of movies per page
          Query.offset(skip), // Skip previous movies based on current page
        ]
      );

      setMovies(response.documents);
      setTotalMovies(response.total); // Set total number of movies for pagination
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

  //pagination

  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    {
      applyFilter ? fetchMovies(page) : fetchFilteredMovies(page);
    }
  };

  useEffect(() => {
    {
      applyFilter ? fetchFilteredMovies(currentPage) : fetchMovies(currentPage);
    } // Fetch movies on initial load or page change
  }, [currentPage]);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 4;

    // Add the first page button
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`pagination-button ${
          currentPage === 1 ? "active activepgbtn" : "notActivepgBtn"
        }`}
      >
        1
      </button>
    );

    // Calculate start and end for middle buttons
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Ensure we always show exactly maxVisibleButtons in the middle section
    if (currentPage < totalPages - maxVisibleButtons) {
      endPage = startPage + maxVisibleButtons - 1;
    }
    if (endPage > totalPages - 1) {
      startPage = endPage - maxVisibleButtons + 1;
    }

    // Add ellipsis before the middle buttons if needed
    if (startPage > 2) {
      buttons.push(
        <span key="left-ellipsis" className="pagination-ellipsis text-light">
          ......
        </span>
      );
    }

    // Add middle page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${
            currentPage === i ? "active activepgbtn" : "notActivepgBtn"
          }`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis after middle buttons if needed
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="right-ellipsis" className="pagination-ellipsis text-light">
          ........
        </span>
      );
    }

    // Add the last page button
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`pagination-button ${
            currentPage === totalPages ? "active activepgbtn" : "notActivepgBtn"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <div className="pagination-container_now col-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <FaChevronLeft />
        </button>
        {buttons}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  const filterBtn = () => {
    if (applyFilter) {
      fetchFilteredMovies();
    } else {
      fetchMovies();
    }
  };
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
  // let filteredMovies = [];
  // let matchesTitle;
  // if (apiStatus === apiStatusConstants.success) {
  //   matchesTitle = movies.filter((each) =>
  //     each.movie_title.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   console.log("matchTitle", matchesTitle);

  //   filteredMovies = matchesTitle.filter((each) => {
  //     // Ensure that the movie title and searchText are not null or undefined

  //     // console.log(
  //     //   "matchesTitle",
  //     //   matchesTitle,
  //     //   "movie_title",
  //     //   each.movie_title,
  //     //   "searchText",
  //     //   searchText
  //     // );

  //     // Check if the selectedGenre exists in the genres array
  //     const matchesGenre =
  //       selectedGenre !== "" && selectedGenre !== "ALL"
  //         ? each.genres?.some(
  //             (genre) => genre?.toLowerCase() === selectedGenre?.toLowerCase()
  //           )
  //         : true;

  //     console.log(
  //       "matchesGenre",
  //       matchesGenre,
  //       "selectedGenre",
  //       selectedGenre,
  //       "each.genres",
  //       each.genres,
  //       each
  //     );

  //     // Ensure selectedQuality and highest_video_quality are not undefined
  //     const matchQuality =
  //       selectedQuality !== "" && selectedQuality !== "ALL"
  //         ? each.highest_video_quality?.toLowerCase() ===
  //           selectedQuality?.toLowerCase()
  //         : true;

  //     console.log(
  //       "matchQuality",
  //       matchQuality,
  //       "each.highest_video_quality",
  //       each.highest_video_quality?.toLowerCase(),
  //       each,
  //       "selectedQuality",
  //       selectedQuality?.toLowerCase()
  //     );

  //     // Ensure imdb_rating is valid and within range
  //     const matchImdb =
  //       each.imdb_rating !== undefined &&
  //       each.imdb_rating <= imdbEndval &&
  //       each.imdb_rating >= imdbStartVal;

  //     // Ensure release_date exists and extract the year
  //     const dateObj = new Date(each.release_date);
  //     const yearMovie = dateObj.getFullYear();
  //     const matchYears = yearMovie >= startValue && yearMovie <= endValue;

  //     return matchQuality && matchImdb && matchYears && matchesGenre;
  //   });
  // }

  let resultView = "";
  switch (apiStatus) {
    case apiStatusConstants.success:
      resultView =
        movies.length >= 1 ? (
          movies.map((each, index) => (
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
          <div className="w-100 d-flex text-center m-auto justify-content-center flex-column align-items-center">
            <img className="rounded w-25" src={noImage} alt="No Result" />
            <h4 className="text-light">No item Found...</h4>
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
                {applyFilter ? (
                  <button
                    className="filter__btn"
                    type="button"
                    onClick={() => {
                      setApplyFilter(!applyFilter);
                      filterBtn();
                    }}
                  >
                    Apply Filter
                  </button>
                ) : (
                  <button
                    className="text-light p-3 rounded "
                    style={{ backgroundColor: "#000" }}
                    type="button"
                    onClick={() => {
                      setApplyFilter(!applyFilter);
                      filterBtn();
                    }}
                  >
                    Remove Filters
                  </button>
                )}

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

            {/* end paginator */}
          </div>
        </div>
      </div>
      {/* end catalog */}
      {/* expected premiere */}
      {renderPaginationButtons()}
      <hr className="text-light" />

      {/* end expected premiere */}
      {/* footer */}

      <Footer />
      {/* end footer */}
      {/* JS */}
    </>
  );
};

export default AllMovies;
