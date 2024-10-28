//imports for filters from here
import React, { useEffect, useState, useRef } from "react";
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import "nouislider/dist/nouislider.css";
//imports for filter ends here
import noImage from "../MovieDetailsPages/no_image_found.jpg.png";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";
import { Audio } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import sampleBg from "../../img/home/home__bg2.jpg";
import Navbar from "../Pages/navbar";
import Footer from "../Pages/Footer";

const AllWebseries = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [searchedVal, setSearchedVal] = useState("");

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

  //Filter starts from here
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

  const fetchFilteredMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    // Initialize an array for query conditions

    // Add genre filter if a genre is selected and not "ALL"

    const genreQuery =
      selectedGenre && selectedGenre !== "ALL"
        ? Query.contains("genres", selectedGenre)
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

      ...(ImdbQuery ? [ImdbQuery] : []),
      ...(yearFilterQuery.length > 0 ? yearFilterQuery : []), // Use yearFilterQuery directly as an array
      // Add any additional queries here
    ];
    console.log("queries", queries);
    try {
      // Fetch movies with applied filters
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
        queries
      );

      setMovies(response.documents);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };
  if (apiStatus === apiStatusConstants.success) {
    console.log(movies[0], apiStatus);
    console.log("newrelease", movies[1], apiStatus, movies);
  }

  //year range filter from here
  const sliderRef = useRef(null);
  const [range, setRange] = useState([1900, 2015]); // Initialize state for slider values
  const [startValue, setStartValue] = useState(range[0]);
  const [endValue, setEndValue] = useState(range[1]);

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

  //filter ends here

  useEffect(() => {
    fetchMovies();
  }, []);
  if (apiStatus === apiStatusConstants.success) {
  }
  let filterWebSeries = movies.filter((each) =>
    each.webseries_title.toLowerCase().includes(searchedVal.toLowerCase())
  );
  if (apiStatus === apiStatusConstants.success) {
    console.log(movies[0], apiStatus);
    console.log("newrelease", movies[1], apiStatus, movies);
  }

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

  return (
    <>
      <Navbar />
      <div
        className="section section--first section--bg"
        data-bg="img/section/section.jpg"
      >
        <div className="container">
          <div className="row">
            <h4 className="text-light ">All Web series</h4>
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
                                  <span id="filter__years-start">
                                    {imdbStartVal}
                                  </span>{" "}
                                  -
                                  <span id="filter__years-end">
                                    {imdbEndval}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Filter for IMBd */}

                        {/* Filter for Year */}
                        <div className=" filter__item" id="filter__year">
                          <span className="filter__item-label">
                            RELEASE YEAR:
                          </span>
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
                                <span id="filter__years-start">
                                  {startValue}
                                </span>{" "}
                                -<span id="filter__years-end">{endValue}</span>
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
            {movies.length > 0 ? (
              apiStatus === apiStatusConstants.success ? (
                <div className="d-flex flex-wrap">
                  {filterWebSeries.map((each, index) => (
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
                              each.genres.map((each, index) => (
                                <a key={index}>{each}</a>
                              ))
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
              ) : (
                <div className="loaderContainer">
                  <Audio color="white" />
                </div>
              )
            ) : (
              noImageFound
            )}
          </div>{" "}
        </div>{" "}
      </div>
      <Footer />
    </>
  );
};

export default AllWebseries;
