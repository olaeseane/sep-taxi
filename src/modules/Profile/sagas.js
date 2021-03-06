import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { request } from '../utils/network';
import { profileFailure, profileRequest, profileSuccess } from './actions';

export function* profileRequestWatcher() {
  yield takeLatest(profileRequest, profileRequestFlow);
}

export function* profileRequestFlow(action) {
  try {
    const data = yield call(request, {
      path: '/user/me',
      method: 'GET',
      token: action.payload
    });
    yield put(profileSuccess(Object.assign({}, data)));
  } catch (e) {
    yield put(profileFailure(e));
  }
}

export default function*() {
  yield fork(profileRequestWatcher);
}
