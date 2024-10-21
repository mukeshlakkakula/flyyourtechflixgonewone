import { Link, useLocation } from "react-router-dom";

import MyIcon from "../Images/logo.svg";
import "./Navbar.css";
// import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      {/* Hello world */}
      <header className="header">
        <div className="header__wrap">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header__content">
                  {/* header logo */}
                  <Link to="/" href="index.html" className="header__logo">
                    <img src={MyIcon} alt="" />
                  </Link>
                  {/* end header logo */}
                  {/* header nav */}

                  <ul className="header__nav ">
                    {/* dropdown */}
                    <li className="header__nav-item">
                      <Link to="/">
                        <button
                          className={
                            location.pathname === "/"
                              ? "header__nav-link header__nav-link--active"
                              : "header__auth header__nav-link"
                          }
                        >
                          Home
                        </button>
                      </Link>
                    </li>
                    {/* end dropdown */}
                    {/* dropdown */}
                    <li className="header__nav-item">
                      <Link to="/movies">
                        <button
                          className={
                            location.pathname === "/movies"
                              ? "header__nav-link header__nav-link--active"
                              : "header__auth header__nav-link"
                          }
                        >
                          Movies
                        </button>
                      </Link>
                    </li>
                    {/* end dropdown */}
                    <li className="header__nav-item ">
                      <Link to="/webseries">
                        <button
                          className={
                            location.pathname === "/webseries"
                              ? "header__nav-link header__nav-link--active"
                              : "header__auth header__nav-link"
                          }
                        >
                          Webseries
                        </button>
                      </Link>
                    </li>

                    {/* dropdown */}

                    {/* end dropdown */}
                  </ul>
                  {/* end header nav */}
                  {/* header auth */}
                  <div className="header__auth">
                    <button className="header__search-btn" type="button">
                      <i className="icon ion-ios-search" />
                    </button>
                  </div>
                  {/* end header auth */}
                  {/* header menu btn */}
                  <button className="header__btn" type="button">
                    <span />
                    <span />
                    <span />
                  </button>
                  {/* end header menu btn */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header search */}
        <form action="#" className="header__search">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header__search-content">
                  <input
                    type="text"
                    placeholder="Search for a movie, TV Series that you are looking for"
                  />
                  <button type="button">search</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* end header search */}
      </header>
    </>
  );
};

export default Navbar;
