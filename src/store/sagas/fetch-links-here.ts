import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../utils/api';
import { fetchLinksHere } from '../routines';

function* handleTriggerAction() {
  try {
    yield put(fetchLinksHere.request(32131));
    const { data } = yield call(api.get, '', {
      params: {
        format: 'json',
        action: 'query',
        prop: 'linkshere',
        pageids: '7456690',
        formatversion: 2,
        lhlimit: '100',
      },
    });
    console.log(data.query.pages[0].linkshere);
    yield put(fetchLinksHere.success({ data: data.query.pages[0].linkshere }));
  } catch (e) {
    yield put(fetchLinksHere.failure(e));
  }
}

export function* fetchLinksHereSaga() {
  yield takeLatest(fetchLinksHere.TRIGGER, handleTriggerAction);
}
