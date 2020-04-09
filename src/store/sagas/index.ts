import { all, fork } from 'redux-saga/effects';
import revisionsSaga from './revisions';
import { fetchLinksHereSaga } from './fetch-links-here';
import { clientLoginSaga } from './client-login';
import { userInfoSaga } from './user-info';

export default function* rootSaga() {
  yield all([
    fork(revisionsSaga),
    fork(fetchLinksHereSaga),
    fork(clientLoginSaga),
    fork(userInfoSaga),
  ]);
}
