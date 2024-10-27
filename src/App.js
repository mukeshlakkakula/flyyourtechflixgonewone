import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Login/adminLogin";
// Create this component for the admin panel
// import PrivateRoute from "./components/PrivateRoute";
// import AdminPanel from "./components/AdminPanel";
// import MovieList from "./components/AdminPanel/MovieList";
import MovieCreate from "./components/AdminPanel/MovieCreate";
import MovieList from "./components/AdminPanel/MoviesList";
import WebSeriesCreate from "./components/AdminPanel/WebSeriesCreate";
import WebSeriesList from "./components/AdminPanel/WebSeriesList";

//react Context
import { SearchProvider } from "../src/context/SearchContext";
//ends context
import Home from "./components/Pages/Home";

import PageNotFound from "./components/Pages/PageNotFound";
import MovieDetails from "./components/MovieDetailsPages/MovieDetails";
import AllMovies from "./components/MovieDetailsPages/AllMovies";

import AllWebseries from "./components/WebseriesDetailsPages/AllWebseries";
import WebseriesDetails from "./components/WebseriesDetailsPages/WebseriesDetails";

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/admin/login" Component={AdminLogin} />
          <Route exact path="/moviedetails/:movieId" Component={MovieDetails} />
          <Route exact path="/admin/createmovie" Component={MovieCreate} />
          <Route exact path="/movies" Component={AllMovies} />{" "}
          <Route exact path="/webseries" Component={AllWebseries} />{" "}
          <Route
            exact
            path="/webseriesdetails/:wId"
            Component={WebseriesDetails}
          />
          <Route exact path="/admin/updatemovie" Component={MovieList} />
          <Route
            exact
            path="/admin/createwebseries"
            Component={WebSeriesCreate}
          />
          <Route
            exact
            path="/admin/updatewebseries"
            Component={WebSeriesList}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>{" "}
    </SearchProvider>
  );
}

export default App;
