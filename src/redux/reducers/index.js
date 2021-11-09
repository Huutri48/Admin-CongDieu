import { combineReducers } from "redux";

import authAdminReducer from "./auth.reducer";
import manageFilmReducer from "./manageFilm.reducer";
import manageCinemaReducer from "./manageCinema.reducer";
import manageUserReducer from "./manageUser.reducer";

export default combineReducers({
	authAdminReducer: authAdminReducer,
	manageUserReducer: manageUserReducer,
	manageFilmReducer: manageFilmReducer,
	manageCinemaReducer: manageCinemaReducer
})