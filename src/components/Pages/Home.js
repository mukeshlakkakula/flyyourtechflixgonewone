import React, { useEffect } from "react";

import Navbar from "./navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Partners from "./Partners";

import "./Home.css";
import NewReleases from "./NewReleases";
import NewItemMovies from "./NewItemMovies";
import NewTvSeries from "./NewTvSeries";
import ExpectedPremier from "./ExpectedPremier";

const Home = () => {
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />

      {/* end header */}
      {/* home */}

      {/* home bg */}
      <section className="home">
        <Carousel />
      </section>
      {/* end home */}
      {/* content */}
      <section className="content">
        <div className="content__head">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* content title */}
                <h2 className="content__title">New items</h2>
                {/* end content title */}
                {/* content tabs nav */}
                <ul
                  className="nav nav-tabs content__tabs"
                  id="content__tabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tab-1"
                      role="tab"
                      aria-controls="tab-1"
                      aria-selected="true"
                    >
                      NEW RELEASES
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-2"
                      role="tab"
                      aria-controls="tab-2"
                      aria-selected="false"
                    >
                      MOVIES
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-3"
                      role="tab"
                      aria-controls="tab-3"
                      aria-selected="false"
                    >
                      TV SERIES
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tab-4"
                      role="tab"
                      aria-controls="tab-4"
                      aria-selected="false"
                    >
                      CARTOONS
                    </a>
                  </li>
                </ul>
                {/* end content tabs nav */}
                {/* content mobile tabs nav */}
                <div className="content__mobile-tabs" id="content__mobile-tabs">
                  <div
                    className="content__mobile-tabs-btn dropdown-toggle"
                    role="navigation"
                    id="mobile-tabs"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <input type="button" defaultValue="New items" />
                    <span />
                  </div>
                  <div
                    className="content__mobile-tabs-menu dropdown-menu"
                    aria-labelledby="mobile-tabs"
                  >
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="1-tab"
                          data-toggle="tab"
                          href="#tab-1"
                          role="tab"
                          aria-controls="tab-1"
                          aria-selected="true"
                        >
                          NEW RELEASES
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="2-tab"
                          data-toggle="tab"
                          href="#tab-2"
                          role="tab"
                          aria-controls="tab-2"
                          aria-selected="false"
                        >
                          MOVIES
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="3-tab"
                          data-toggle="tab"
                          href="#tab-3"
                          role="tab"
                          aria-controls="tab-3"
                          aria-selected="false"
                        >
                          TV SERIES
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="4-tab"
                          data-toggle="tab"
                          href="#tab-4"
                          role="tab"
                          aria-controls="tab-4"
                          aria-selected="false"
                        >
                          CARTOONS
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* end content mobile tabs nav */}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {/* content tabs */}
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="tab-1"
              role="tabpanel"
              aria-labelledby="1-tab"
            >
              <div className="row">
                {/* card */}
                <NewReleases />
                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab-2"
              role="tabpanel"
              aria-labelledby="2-tab"
            >
              <div className="row">
                {/* card */}
                <NewItemMovies />

                {/* end card */}
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover3.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">Whitney</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Romance</a>
                        <a href="#">Drama</a>
                        <a href="#">Music</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        6.3
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab-3"
              role="tabpanel"
              aria-labelledby="3-tab"
            >
              <div className="row">
                {/* card */}
                <NewTvSeries />

                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}

                {/* end card */}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab-4"
              role="tabpanel"
              aria-labelledby="4-tab"
            >
              <div className="row">
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">I Dream in Another Language</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Action</a>
                        <a href="#">Triler</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        8.4
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover3.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">Benched</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Comedy</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        7.1
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
                {/* card */}

                {/* end card */}
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover6.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">Whitney</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Romance</a>
                        <a href="#">Drama</a>
                        <a href="#">Music</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        6.3
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover5.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">Blindspotting</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Comedy</a>
                        <a href="#">Drama</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        7.9
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover4.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">I Dream in Another Language</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Action</a>
                        <a href="#">Triler</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        8.4
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover3.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">Benched</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Comedy</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        7.1
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover2.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">Whitney</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Romance</a>
                        <a href="#">Drama</a>
                        <a href="#">Music</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        6.3
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
                {/* card */}
                <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
                  <div className="card">
                    <div className="card__cover">
                      <img src="img/covers/cover.jpg" alt="" />
                      <a href="#" className="card__play">
                        <i className="icon ion-ios-play" />
                      </a>
                    </div>
                    <div className="card__content">
                      <h3 className="card__title">
                        <a href="#">Blindspotting</a>
                      </h3>
                      <span className="card__category">
                        <a href="#">Comedy</a>
                        <a href="#">Drama</a>
                      </span>
                      <span className="card__rate">
                        <i className="icon ion-ios-star" />
                        7.9
                      </span>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
          </div>
          {/* end content tabs */}
        </div>
      </section>
      {/* end content */}
      {/* expected premiere */}
      <ExpectedPremier />

      {/* end expected premiere */}
      {/* partners */}

      <Partners />
      {/* end partners */}
      {/* footer */}
      <Footer />
    </>
  );
};

export default Home;
