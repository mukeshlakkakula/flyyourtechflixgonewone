import React, { useEffect, useState, useRef } from "react";
//mediaplayer from here
import ReactPlayer from "react-player";

//media player ends here
import { databases } from "../AppWrite/appwriteLoginConfig";
import { useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import sampleBg from "../../img/home/home__bg2.jpg";
import Navbar from "../Pages/navbar";
import Footer from "../Pages/Footer";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const apiStatusConstants = {
    initial: "INITAIL",
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
  };
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  console.log("apiInitial", apiStatus);

  const fetchMovieData = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await databases.getDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_MOVIE_DETAILS_COLLECTION_ID,
        movieId
      );
      setMovie(response);
      setApiStatus(apiStatusConstants.success);
      console.log("res", response);
    } catch (error) {
      console.error("Error fetching movie data:", error);

      setApiStatus(apiStatusConstants.failure);
    }
  };
  useEffect(() => {
    fetchMovieData();
  }, [movieId]);

  let timestamp = "";
  let date = "";
  let year = "";
  if (movie !== null) {
    timestamp = movie.release_date;
    date = new Date(timestamp);
    year = date.getFullYear();
  }

  let resultView = "";
  switch (apiStatus) {
    case apiStatusConstants.success:
      resultView = "";
      break;

    case apiStatusConstants.inProgress:
      resultView = (
        <div className="loaderContainer p-5 m-auto w-100">
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

  // media player starts here
  let videoSources = [
    {
      quality: "1080p",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
    },
    {
      quality: "720p",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    },
    {
      quality: "480p",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    },
  ];

  if (apiStatus === apiStatusConstants.success) {
    console.log("movieUrl", movie.qualityUrls);
    videoSources = [
      {
        quality: "1080p",
        src: movie.qualityUrls["1080p"],
      },
      {
        quality: "720p",
        src: movie.qualityUrls["720p"],
      },
      {
        quality: "480p",
        src: movie.qualityUrls["480p"],
      },
    ];
  }

  const [selectedQuality, setSelectedQuality] = useState(videoSources[0].src);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const playerRef = useRef(null); // Ref to access the React Player instance
  const [currentTime, setCurrentTime] = useState(0); // Store the current playback time
  const [isChangingQuality, setIsChangingQuality] = useState(false); // Flag to prevent re-seeking during quality change
  const [isPlaying, setIsPlaying] = useState(false); // Flag to control playback

  // Handle quality change
  const handleQualityChange = (src) => {
    if (playerRef.current) {
      setCurrentTime(playerRef.current.getCurrentTime()); // Get current playback time before changing quality
      setSelectedQuality(src); // Change quality
      setIsChangingQuality(true); // Set flag to indicate quality is changing
      setIsPlaying(true); // Set to play automatically after changing quality
    }
  };

  // When the player is ready, seek to the last known time if changing quality
  const handlePlayerReady = () => {
    if (isChangingQuality) {
      playerRef.current.seekTo(currentTime); // Seek back to the saved time
      setIsChangingQuality(false); // Reset flag after seeking
      playerRef.current.getInternalPlayer().play(); // Play the video after seeking
    }
  };

  // Handle when the video is playing or paused
  const handlePlayPause = (playing) => {
    if (!playing) {
      // Store the current time when paused
      setCurrentTime(playerRef.current.getCurrentTime());
      setIsPlaying(false); // Update playing state
    } else {
      setIsPlaying(true); // Update playing state
    }
  };

  //media player ends here
  return (
    <div>
      <Navbar />
      {resultView}

      <section className="section details">
        {/* details background */}
        <div className="details__bg mvbg" data-bg="img/home/home__bg.jpg" />
        {/* end details background */}
        {/* details content */}
        <div className="container">
          <div className="row">
            {/* title */}
            <div className="col-12">
              <h1 className="details__title">
                {apiStatus === apiStatusConstants.success
                  ? movie.movie_title
                  : sampleBg}
              </h1>
            </div>
            {/* end title */}
            {/* content */}
            <div className="col-12 col-xl-6">
              <div className="card card--details">
                <div className="row">
                  {/* card cover */}
                  <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                    <div className="card__cover">
                      <img
                        src={
                          apiStatus === apiStatusConstants.success
                            ? movie.thumbnail_url
                            : sampleBg
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  {/* end card cover */}
                  {/* card content */}
                  <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                    <div className="card__content">
                      <div className="card__wrap">
                        <span className="card__rate">
                          <i className="icon ion-ios-star" />
                          {apiStatus === apiStatusConstants.success
                            ? movie.imdb_rating
                            : sampleBg}
                        </span>
                        <ul className="card__list">
                          <li>
                            {apiStatus === apiStatusConstants.success
                              ? movie.highest_video_quality
                              : sampleBg}
                          </li>
                          <li>
                            {apiStatus === apiStatusConstants.success
                              ? movie.age_rating
                              : sampleBg}
                          </li>
                        </ul>
                      </div>
                      <ul className="card__meta">
                        <li>
                          <span>Genre:</span>{" "}
                          {apiStatus === apiStatusConstants.success ? (
                            movie.genres.map((each, index) => (
                              <a key={index}>{each}</a>
                            ))
                          ) : (
                            <a>cast</a>
                          )}{" "}
                        </li>
                        <li>
                          <span>Release year:</span> {year}
                        </li>
                        <li>
                          <span>Running time:</span>
                          {apiStatus === apiStatusConstants.success
                            ? movie.duration
                            : sampleBg}{" "}
                          min
                        </li>
                        <li>
                          <span>Country:</span>{" "}
                          <a href="#">
                            {apiStatus === apiStatusConstants.success
                              ? movie.country
                              : sampleBg}
                          </a>{" "}
                        </li>
                      </ul>
                      <div className="card__description card__description--details">
                        {apiStatus === apiStatusConstants.success
                          ? movie.description
                          : sampleBg}
                      </div>
                    </div>
                  </div>
                  {/* end card content */}
                </div>
              </div>
            </div>
            {/* end content */}
            {/* player */}

            <div className="col-12 col-xl-6">
              <div className="video-player-wrapper">
                <ReactPlayer
                  ref={playerRef} // Assign ref to React Player
                  url={selectedQuality}
                  controls
                  playing={isPlaying} // Control playback with isPlaying state
                  width="100%"
                  height="100%"
                  light={
                    <img
                      src={
                        apiStatus === apiStatusConstants.success
                          ? movie.thumbnail_url
                          : sampleBg
                      }
                      alt="Thumbnail"
                      style={{ height: "303px", width: "100%" }}
                    />
                  }
                  onReady={handlePlayerReady} // Call this function when the player is ready
                  onPause={() => handlePlayPause(false)} // Update current time when paused
                  onPlay={() => handlePlayPause(true)} // Update current time when playing
                  onSeek={(time) => setCurrentTime(time)} // Update current time when seeking
                />

                {/* Quality Selector Icon */}
                <div
                  className="quality-icon"
                  onClick={() => setShowQualityOptions((prev) => !prev)}
                >
                  Q
                </div>

                {showQualityOptions && (
                  <div className="quality-selector">
                    {videoSources.map((source) => (
                      <button
                        key={source.quality}
                        onClick={() => {
                          handleQualityChange(source.src); // Change quality
                          setShowQualityOptions(false); // Close the dropdown
                        }}
                        className={
                          selectedQuality === source.src
                            ? "active btnNotActive"
                            : "btnNotActive"
                        }
                      >
                        {source.quality}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* end player */}
            <div className="col-12">
              <div className="details__wrap">
                {/* availables */}
                <div className="details__devices">
                  <span className="details__devices-title">
                    Available on devices:
                  </span>
                  <ul className="details__devices-list">
                    <li>
                      <i className="icon ion-logo-apple" />
                      <span>IOS</span>
                    </li>
                    <li>
                      <i className="icon ion-logo-android" />
                      <span>Android</span>
                    </li>
                    <li>
                      <i className="icon ion-logo-windows" />
                      <span>Windows</span>
                    </li>
                    <li>
                      <i className="icon ion-md-tv" />
                      <span>Smart TV</span>
                    </li>
                  </ul>
                </div>
                {/* end availables */}
                {/* share */}
                <div className="details__share">
                  <span className="details__share-title">
                    Share with friends:
                  </span>
                  <ul className="details__share-list">
                    <li className="facebook">
                      <a href="#">
                        <i className="icon ion-logo-facebook" />
                      </a>
                    </li>
                    <li className="instagram">
                      <a href="#">
                        <i className="icon ion-logo-instagram" />
                      </a>
                    </li>
                    <li className="twitter">
                      <a href="#">
                        <i className="icon ion-logo-twitter" />
                      </a>
                    </li>
                    <li className="vk">
                      <a href="#">
                        <i className="icon ion-logo-vk" />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* end share */}
              </div>
            </div>
          </div>
        </div>
        {/* end details content */}
      </section>

      <Footer />
    </div>
  );
};

export default MovieDetails;
