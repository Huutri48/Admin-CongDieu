import { Router, Switch, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import history from "./utils/history"
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import SidebarLayoutRoute from "./SidebarLayoutRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ManageUser from "./pages/ManageUser/ManageUser";
import ManageFilm from "./pages/ManageFilm/ManageFilm";
import ManageCinema from "./pages/ManageCinema/ManageCinema";
import AddUser from "./pages/ManageUser/AddUser/AddUser";
import NotFound from "./pages/ErrorPage/NotFound/NotFound";
import AddFilm from "./pages/ManageFilm/AddFilm/AddFilm";
import Profile from "./pages/Profile/Profile";
import EditFilm from "./pages/ManageFilm/EditFilm/EditFilm";
import InfoMovieShowtimes from "./pages/ManageFilm/InfoMovieShowtimes/InfoMovieShowtimes";

function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <SidebarLayoutRoute exact path="/" component={Dashboard} />
          <SidebarLayoutRoute exact path="/dashboard" component={Dashboard} />
          <SidebarLayoutRoute
            exact
            path="/manage-user"
            component={ManageUser}
          />
          <SidebarLayoutRoute
            exact
            path="/manage-user/add-user"
            component={AddUser}
          />
          <SidebarLayoutRoute
            exact
            path="/manage-film"
            component={ManageFilm}
          />
          <SidebarLayoutRoute
            exact
            path="/manage-film/add-film"
            component={AddFilm}
          />
          <SidebarLayoutRoute
            exact
            path="/manage-film/edit-film"
            component={EditFilm}
          />
          <SidebarLayoutRoute
            exact
            path="/manage-film/info-about-movie-showtime/:maPhim"
            component={InfoMovieShowtimes}
          />
          <SidebarLayoutRoute
            exact
            path="/manage-cinema"
            component={ManageCinema}
          />

          <SidebarLayoutRoute
            exact
            path="/profile"
            component={Profile}
          />
          <Route component={NotFound} />

        </Switch>
      </Router>
    </>
  );
}

export default App;
