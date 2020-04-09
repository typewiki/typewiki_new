import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRevisions } from '../../routines';
import api from '../../utils/api';
import { normalize } from 'normalizr';
import querySchema from '../../schemas/query';

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
    const { entities } = normalize(data.query, querySchema);
    yield put(fetchRevisions.success({ entities }));
  } catch (e) {
    yield put(fetchRevisions.failure(e));
  }
}

export function* fetchRevisionsSaga() {
  yield takeLatest(fetchRevisions.TRIGGER, handleTriggerAction);
}
