import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../utils/api';
import { clientLogin } from '../routines';
import { fetchToken } from '../utils/helpers';

function* handleTriggerAction(action: any) {
  try {
    yield put(clientLogin.request());
    const loginToken = yield call(fetchToken, 'login');
    const { username, password } = action.payload;

    const loginResponse = yield call(api.post, '', {
      action: 'clientlogin',
      username,
      password,
      loginreturnurl: window.location,
      logintoken: loginToken,
    });

    if (!loginResponse.data.clientlogin) {
      yield put(clientLogin.failure());
    }

    const status = loginResponse.data.clientlogin?.status;

    switch (status) {
      case 'PASS': {
        const { username } = loginResponse.data.clientlogin;
        yield put(clientLogin.success({ username }));
        break;
      }
      case 'FAIL':
      default: {
        const { message, messagecode } = loginResponse.data.clientlogin;
        yield put(clientLogin.failure({ message, messagecode }));
      }
    }
  } catch (e) {
    yield put(clientLogin.failure(e));
  }
}

export function* clientLoginSaga() {
  yield takeLatest(clientLogin.TRIGGER, handleTriggerAction);
}
