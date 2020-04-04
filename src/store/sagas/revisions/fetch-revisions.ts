import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRevisions } from '../../routines';
import api from '../api';

function* handleTriggerAction() {
  try {
    yield put(fetchRevisions.request(32131));
    const { data } = yield call(api.get, '', {
      params: {
        format: 'json',
        action: 'query',
        prop: 'revisions',
        pageids: '7456690',
        rvprop:
          'ids|flags|size|sha1|contentmodel|timestamp|user|comment|parsedcomment|tags',
        formatversion: 2,
        rvlimit: '100',
      },
    });
    console.log(data.query.pages[0].revisions);
    yield put(fetchRevisions.success({ data: data.query.pages[0].revisions }));
  } catch (e) {
    yield put(fetchRevisions.failure(e));
  }
}

export function* fetchRevisionsSaga() {
  yield takeLatest(fetchRevisions.TRIGGER, handleTriggerAction);
}
