import { fork } from "redux-saga/effects";

import authAdminSaga from './auth.saga';
import manageFilmSaga from "./manageFilm.saga";
import manageCinemaSaga from "./manageCinema.saga";
import manageUserSaga from './manageUser.saga'

export default function* mySaga() {
	yield fork(authAdminSaga)
	yield fork(manageUserSaga)
	yield fork(manageFilmSaga)
	yield fork(manageCinemaSaga)
}
