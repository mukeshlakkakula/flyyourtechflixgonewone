import React, { useEffect, useState } from "react";
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
      resultView = (
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
                            8.4
                          </span>
                          <ul className="card__list">
                            <li>HD</li>
                            <li>{movie.age_rating}</li>
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
                            {movie.duration} min
                          </li>
                          <li>
                            <span>Country:</span>{" "}
                            <a href="#">{movie.country}</a>{" "}
                          </li>
                        </ul>
                        <div className="card__description card__description--details">
                          {movie.description}
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
                <video
                  controls=""
                  crossOrigin=""
                  playsInline=""
                  poster="../../../cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
                  id="player"
                >
                  {/* Video files */}
                  <source
                    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                    type="video/mp4"
                    size={576}
                  />
                  <source
                    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
                    type="video/mp4"
                    size={720}
                  />
                  <source
                    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
                    type="video/mp4"
                    size={1080}
                  />
                  <source
                    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4"
                    type="video/mp4"
                    size={1440}
                  />
                  {/* Caption files */}
                  <track
                    kind="captions"
                    label="English"
                    srcLang="en"
                    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
                    default=""
                  />
                  <track
                    kind="captions"
                    label="Français"
                    srcLang="fr"
                    src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
                  />
                  {/* Fallback for browsers that don't support the <video> element */}
                  <a
                    href="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                    download=""
                  >
                    Download
                  </a>
                </video>
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
      );
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

  return (
    <div>
      <Navbar />
      {resultView}

      <Footer />
    </div>
  );
};

export default MovieDetails;
