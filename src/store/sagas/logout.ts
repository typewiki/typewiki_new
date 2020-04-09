import { takeLatest, put } from 'redux-saga/effects';
import { logout } from '../routines';

function* handleTriggerAction() {
  try {
    yield put(logout.request());
    yield put(logout.success());
    yield put(logout.fulfill());
  } catch (e) {
    yield put(logout.failure());
  }
}

export function* logoutSaga() {
  yield takeLatest(logout.TRIGGER, handleTriggerAction);
}
