import { all, fork } from 'redux-saga/effects';
import revisionsSaga from './revisions';

export default function* rootSaga() {
  yield all([fork(revisionsSaga)]);
}
