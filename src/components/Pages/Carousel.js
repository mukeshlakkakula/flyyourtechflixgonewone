import React, { useEffect, useState } from "react";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { Query } from "appwrite";

import sampleBg from "../../img/home/home__bg2.jpg";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
// import sampleImg from "../../img/covers/cover2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Custom CSS for unique class names

// Custom Previous Arrow Component
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-carousel-prev-arrow`}
      onClick={onClick}
    >
      &#10094;
    </div>
  );
};

// Custom Next Arrow Component
const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-carousel-next-arrow`}
      onClick={onClick}
    >
      &#10095;
    </div>
  );
};

const Carousel = () => {
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
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        [
          Query.orderDesc("release_date"),
          Query.limit(5), // Sort by release_date in descending order
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
    console.log("movies1", movies[1], apiStatus, movies);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet screen
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile screen
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  let resultView = "";
  switch (apiStatus) {
    case apiStatusConstants.success:
      resultView = movies.map((each, index) => (
        <div
          onClick={() => handleMovieClick(each.movie_id)}
          className="item_padding"
          key={index}
        >
          <div className="item">
            {/* card */}
            <div className="card card--big">
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
              <div className="card__content_container bg-transparent">
                <h3 className="card__title">
                  <a href="#">
                    {apiStatus === apiStatusConstants.success
                      ? each.movie_title
                      : sampleBg}
                  </a>
                </h3>
                <span className="card__category">
                  {apiStatus === apiStatusConstants.success ? (
                    each.genres.map((each) => <a>{each}</a>)
                  ) : (
                    <a>cast</a>
                  )}{" "}
                </span>
                <span className="card__rate">
                  <i className="icon ion-ios-star" />
                  8.4
                </span>
              </div>
            </div>
            {/* end card */}
          </div>{" "}
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
    <div className="carousel_container">
      <h1 className="home__title ">
        <p className="header_text">
          <b>NEW ITEMS</b> OF THIS SEASON
        </p>
      </h1>

      <div className="custom-carousel-container">
        <Slider {...settings}>{resultView}</Slider>
      </div>
    </div>
  );
};

export default Carousel;
