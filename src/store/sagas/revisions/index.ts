import { all, fork } from 'redux-saga/effects';
import { fetchRevisionsSaga } from './fetch-revisions';

export default function* revisionsSaga() {
  yield all([fork(fetchRevisionsSaga)]);
}
