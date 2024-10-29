import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js";
import LinesEllipsis from "react-lines-ellipsis";

import Navbar from "../Pages/navbar";
import "./WebseriesDetails.css";
//used from movieDetails starts from here
import { ImEqualizer2 } from "react-icons/im";
import ReactPlayer from "react-player";
import { databases } from "../AppWrite/appwriteLoginConfig";
import { useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import sampleBg from "../../img/home/home__bg2.jpg";

import Footer from "../Pages/Footer";
import "../MovieDetailsPages/MovieDetails.css";

const WebseriesDetails = () => {
  const { wId } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  const [activeSeason, setActiveSeason] = useState("");
  const [activeEpisode, setActiveEpisode] = useState("");
  const apiStatusConstants = {
    initial: "INITAIL",
    success: "SUCCESS",
    inProgress: "INPROGRESS",
    failure: "FAILURE",
  };
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  console.log("apiInitial", apiStatus);
  const [selectedQuality, setSelectedQuality] = useState("");
  const fetchMovieData = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await databases.getDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_WEBSERIES_COLLECTION_ID,
        wId
      );
      setMovie(response);

      setApiStatus(apiStatusConstants.success);
      console.log(
        "fetchedData",
        response.webseriesSeasons[0].webEpisodes[0]["720p"]
      );
      setActiveSeason(response.webseriesSeasons[0]);
      setSelectedQuality(response.webseriesSeasons[0].webEpisodes[0]["720p"]);
      setActiveEpisode(response.webseriesSeasons[0].webEpisodes[0]);
    } catch (error) {
      console.error("Error fetching movie data:", error);

      setApiStatus(apiStatusConstants.failure);
    }
  };
  useEffect(() => {
    fetchMovieData();
  }, [wId]);

  let timestamp = "";
  let date = "";
  let year = "";
  let month = "";
  if (movie !== null) {
    timestamp = movie.release_date;
    date = new Date(timestamp);
    year = date.getFullYear();
    month = date.toLocaleString("default", { month: "long" });
  }

  let resultView = "";
  switch (apiStatus) {
    case apiStatusConstants.success:
      resultView = "";
      break;

    case apiStatusConstants.inProgress:
      resultView = (
        <div
          className="loaderContainer p-5 m-auto w-100 "
          style={{ height: "100vh" }}
        >
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

  //Jquery starts from here
  useEffect(() => {
    // Initialize custom scrollbar for dropdown
    $(".scrollbar-dropdown").mCustomScrollbar({
      axis: "y",
      scrollbarPosition: "outside",
      theme: "custom-bar",
    });

    // Initialize custom scrollbar for accordion
    $(".accordion").mCustomScrollbar({
      axis: "y",
      scrollbarPosition: "outside",
      theme: "custom-bar2",
    });

    // Cleanup on component unmount
    return () => {
      $(".scrollbar-dropdown").mCustomScrollbar("destroy");
      $(".accordion").mCustomScrollbar("destroy");
    };
  }, []);
  // jquery ends here
  // media player starts here
  let videoSources = [
    {
      quality: "1080p",
      src:
        apiStatus === apiStatusConstants.success
          ? activeEpisode["1080p"]
          : "https://www.youtube.com/watch?v=AAq06bS8UZM&list=RDMMAAq06bS8UZM&start_radio=1",
    },
    {
      quality: "720p",
      src:
        apiStatus === apiStatusConstants.success
          ? activeEpisode["720p"]
          : "https://www.youtube.com/watch?v=AAq06bS8UZM&list=RDMMAAq06bS8UZM&start_radio=1",
    },
    {
      quality: "480p",
      src:
        apiStatus === apiStatusConstants.success
          ? activeEpisode["480p"]
          : "https://www.youtube.com/watch?v=AAq06bS8UZM&list=RDMMAAq06bS8UZM&start_radio=1",
    },
  ];

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
  console.log("actSea", activeSeason);
  const handlePlayPause = (playing) => {
    if (!playing) {
      // Store the current time when paused
      setCurrentTime(playerRef.current.getCurrentTime());
      setIsPlaying(false); // Update playing state
    } else {
      setIsPlaying(true); // Update playing state
    }
  };
  let mapSeasons =
    apiStatus === apiStatusConstants.success ? (
      movie.webseriesSeasons.map((each, index) => (
        <div className="accordion__card " key={index}>
          <div className="card-header" id={`heading${index}`}>
            <button
              className="collapsed"
              type="button"
              data-toggle="collapse"
              data-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
              <span
                onClick={() => {
                  setActiveSeason(each);
                  setActiveEpisode(each.webEpisodes[0]);
                  setSelectedQuality(each.webEpisodes[0]["720p"]);
                }}
              >
                Season: {each.season_number}
              </span>
              <span>
                {each.webEpisodes.length} Episodes from {month}, {year}
              </span>
            </button>
          </div>
          <div
            id={`collapse${index}`}
            className="collapse"
            aria-labelledby={`heading${index}`}
            data-parent="#accordion"
          >
            <div className="card-body">
              <table className="accordion__list">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Duration</th>
                  </tr>
                </thead>

                <tbody>
                  {each.webEpisodes.map((each, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        console.log("each", each);
                        setActiveEpisode(each);
                        setSelectedQuality(each["720p"]);
                      }}
                    >
                      <th>{each.episode_number}</th>
                      <td>{each.episode_title}</td>
                      <td>{each.duration}min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))
    ) : (
      <></>
    );
  const [playerHeight, setPlayerHeight] = useState("172px"); // Default for small screens

  useEffect(() => {
    // Function to update the height based on window size
    const updatePlayerHeight = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setPlayerHeight("270px"); // Large devices
      } else if (width >= 768) {
        setPlayerHeight("303px"); // Tablet view
      } else {
        setPlayerHeight("172px"); // Below tablet view
      }
    };

    // Set initial height
    updatePlayerHeight();

    // Update height on window resize
    window.addEventListener("resize", updatePlayerHeight);
    return () => window.removeEventListener("resize", updatePlayerHeight);
  }, []);

  return (
    <div>
      <Navbar />

      {/* section Starts from Here */}
      {apiStatus === apiStatusConstants.success ? (
        <>
          <section className="section details">
            {/* details background */}
            <div className="details__bg mvbg" data-bg={sampleBg} />
            {/* end details background */}
            {/* details content */}
            <div className="container">
              <div className="row">
                {/* title */}
                <div className="col-12">
                  <h1 className="details__title">
                    {apiStatus === apiStatusConstants.success
                      ? movie.webseries_title
                      : "Web Series title"}
                  </h1>
                </div>
                {/* end title */}
                {/* content */}
                <div className="col-10">
                  <div className="card card--details card--series">
                    <div className="row">
                      {/* card cover */}
                      <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                        <div className="card__cover ">
                          <img
                            className="detailsIMage"
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
                      <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                        <div className="card__content">
                          <div className="card__wrap">
                            <span className="card__rate">
                              <i className="icon ion-ios-star" />
                              {apiStatus === apiStatusConstants.success
                                ? movie.imdb_rating
                                : "IMDb rating"}
                            </span>
                            <ul className="card__list">
                              <li>
                                {apiStatus === apiStatusConstants.success
                                  ? movie.webseriesSeasons[0].webEpisodes[0]
                                      .highest_quality
                                  : "IMDb rating"}
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
                                <a>genres</a>
                              )}{" "}
                            </li>
                            <li>
                              <span>Release year:</span> {year}
                            </li>
                            <li>
                              <span>Running time:</span>{" "}
                              {apiStatus === apiStatusConstants.success
                                ? movie.webseriesSeasons.length
                                : "duration"}{" "}
                              Seasons
                            </li>
                            <li>
                              <span>Country:</span>{" "}
                              <a href="#">
                                {apiStatus === apiStatusConstants.success
                                  ? movie.country
                                  : "Country"}
                              </a>{" "}
                            </li>
                          </ul>
                          <div className="card__description card__description--details">
                            <div className="card__description card__description--details your-element ">
                              {apiStatus === apiStatusConstants.success
                                ? movie.description
                                : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end card content */}
                    </div>
                  </div>
                </div>
                {/* end content */}
                <h4 className="text-light">
                  season{" "}
                  <span style={{ color: "#ff9dcb", fontWeight: "bold" }}>
                    {activeSeason.season_number}{" "}
                  </span>
                  Episode
                  <span style={{ color: "#ff9dcb", fontWeight: "bold" }}>
                    {activeEpisode.episode_number} ,{" "}
                    {activeEpisode.episode_title}
                  </span>
                </h4>{" "}
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
                              ? movie.trailer_url
                              : sampleBg
                          }
                          alt="Thumbnail"
                          style={{
                            height: playerHeight,
                            width: "100%",
                          }}
                        />
                      }
                      onReady={handlePlayerReady} // Call this function when the player is ready
                      onPause={() => handlePlayPause(false)} // Update current time when paused
                      onPlay={() => handlePlayPause(true)} // Update current time when playing
                      onSeek={(time) => setCurrentTime(time)} // Update current time when seeking
                    />

                    {/* Quality Selector Icon */}
                    <p
                      style={{ fontSize: "0.7rem" }}
                      className="quality-icon"
                      onClick={() => setShowQualityOptions((prev) => !prev)}
                    >
                      <ImEqualizer2 />
                    </p>

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
                {/* accordion */}
                <div className="col-12 col-xl-6 scrollbar-dropdown">
                  <div className="accordion overflowContainer" id="accordion">
                    <div className="accordion__card "> {mapSeasons}</div>
                  </div>
                </div>
                {/* end accordion */}
              </div>
            </div>
            {/* end details content */}
          </section>
          <Footer />
        </>
      ) : (
        <div
          className="loaderContainer p-5 m-auto w-100 "
          style={{ height: "100vh" }}
        >
          <Audio color="white" />
        </div>
      )}

      {/* section Ends Here */}
    </div>
  );
};

export default WebseriesDetails;
