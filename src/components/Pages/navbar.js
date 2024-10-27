import React, { useState, useContext } from "react";

//importing context
import { SearchContext } from "../../context/SearchContext";

import { Link, useLocation, useNavigate } from "react-router-dom";

import MyIcon from "../Images/logo.svg";

import "./Navbar.css";
// import { useState } from "react";

const Navbar = () => {
  // search context here
  const { setSearchText } = useContext(SearchContext);
  const [navSearch, setNavSearch] = useState("");
  const sendSearchText = () => {
    setSearchText(navSearch);
  };

  const handleSearchChange = (e) => {
    setNavSearch(e.target.value);
  };

  //handles search here

  const [isMenuActive, setMenuActive] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setMenuActive(!isMenuActive);

    // Ensure search is deactivated if menu is activated
    if (isSearchActive) {
      setSearchActive(false);
    }
  };
  console.log("isSearchActive", isSearchActive);
  const navigate = useNavigate();
  const toggleSearch = () => {
    setSearchActive(!isSearchActive);
    navigate("/movies");
    console.log("navigat", navigate, isSearchActive);
    // Ensure menu is deactivated if search is activated
    if (isMenuActive) {
      setMenuActive(false);
    }
  };
  console.log("searchAtive", isSearchActive, "menuActive", isMenuActive);

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

                  <ul
                    className={`header__nav ${
                      isMenuActive ? "header__nav--active" : ""
                    }`}
                  >
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
                    <button
                      className={`header__search-btn ${
                        isSearchActive ? "active" : ""
                      }`}
                      onClick={toggleSearch}
                      type="button"
                    >
                      <i className="icon ion-ios-search" />
                    </button>
                  </div>
                  {/* end header auth */}
                  {/* header menu btn */}
                  <button
                    className={`header__btn ${
                      isMenuActive ? "header__btn--active" : ""
                    }`}
                    onClick={toggleMenu}
                    type="button"
                  >
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
        <form
          action="#"
          className={`header__search ${
            isSearchActive ? "header__search--active" : ""
          }`}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header__search-content">
                  <input
                    type="text"
                    value={navSearch}
                    onChange={handleSearchChange}
                    placeholder="Search for a movie, TV Series that you are looking for"
                  />
                  <button type="button" onClick={sendSearchText}>
                    search
                  </button>
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
