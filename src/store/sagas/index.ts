import { all, fork } from 'redux-saga/effects';
import revisionsSaga from './revisions';
import { fetchLinksHereSaga } from './fetch-links-here';

export default function* rootSaga() {
  yield all([fork(revisionsSaga), fork(fetchLinksHereSaga)]);
}
