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
import Navbar from "./components/Pages/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/login" Component={AdminLogin} />
        {/* {/* <Route exact path="/admin" Component={AdminPanel} /> */}
        <Route exact path="/admin/createmovie" Component={MovieCreate} />
        <Route exact path="/admin/updatemovie" Component={MovieList} />
        <Route
          exact
          path="/admin/createwebseries"
          Component={WebSeriesCreate}
        />
        <Route exact path="/admin/updatewebseries" Component={WebSeriesList} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
