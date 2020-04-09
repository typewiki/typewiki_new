import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchUserInfo } from '../routines';
import api from '../utils/api';

function* handleTriggerAction() {
  try {
    yield put(fetchUserInfo.request());
    const { data } = yield call(api.get, '', {
      params: {
        action: 'query',
        meta: 'userinfo',
        uiprop: [
          'acceptlang',
          'blockinfo',
          'centralids',
          'changeablegroups',
          'editcount',
          'email',
          'groupmemberships',
          'groups',
          'hasmsg',
          'implicitgroups',
          'latestcontrib',
          'options',
          'ratelimits',
          'realname',
          'registrationdate',
          'rights',
          'unreadcount',
        ],
      },
    });
    yield put(fetchUserInfo.success());
  } catch (e) {
    yield put(fetchUserInfo.failure());
  }
}

export function* userInfoSaga() {
  yield takeLatest(fetchUserInfo.TRIGGER, handleTriggerAction);
}
