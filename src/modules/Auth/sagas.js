import { takeLatest, put, call, all, fork } from 'redux-saga/effects';
import {
  authRegistrationRequest,
  authRegistrationFailure,
  authRegistrationSuccess,
  authAuthorizationRequest,
  authAuthorizationSuccess,
  authAuthorizationFailure,
  authSetToken,
  authSetUserCredentials
} from './actions';
import { request } from '../utils/network';
import { save } from '../utils/localstorage';

// TODO join two or more watchers (e.g. authRegistration and authAutrorization
function* authRegistrationRequestWatcher() {
  yield takeLatest(authRegistrationRequest, authRegistrationRequestFlow);
}

function* authRegistrationRequestFlow(action) {
  try {
    const data = yield call(request, {
      path: '/user',
      method: 'POST',
      body: JSON.stringify(action.payload),
      token: false
    });
    yield put(authRegistrationSuccess(Object.assign({}, data))); //TODO why Object.assign?
  } catch (e) {
    yield put(authRegistrationFailure(e)); //TODO - handle registration error
  }
}

function* authRegistrationSuccessWatcher() {
  yield takeLatest(authRegistrationSuccess, authRegistrationSuccessFlow);
}

function* authRegistrationSuccessFlow(action) {
  const { token, user } = action.payload;
  const { email, id } = user;
  yield call(save, token);
  yield all([
    put(authSetUserCredentials({ email, id })),
    put(authSetToken(token))
  ]);
}

function* authAuthorizationRequestWatcher() {
  yield takeLatest(authAuthorizationRequest, authAuthorizationRequestFlow);
}

function* authAuthorizationRequestFlow(action) {
  try {
    const data = yield call(request, {
      path: '/session',
      method: 'POST',
      body: JSON.stringify(action.payload),
      token: false
    });
    yield put(authAuthorizationSuccess(Object.assign({}, data))); //TODO why Object.assign?
  } catch (e) {
    yield put(authAuthorizationFailure(e)); //TODO - handle registration error
  }
}

function* authAuthorizationSuccessWatcher() {
  yield takeLatest(authAuthorizationSuccess, authAuthorizationSuccessFlow);
}

function* authAuthorizationSuccessFlow(action) {
  const { ok, token, user } = action.payload;
  const { email, id } = user;
  if (ok && token !== null) {
    yield call(save, token);
    yield all([
      put(authSetUserCredentials({ email, id })),
      put(authSetToken(token))
    ]);
  } else put(authAuthorizationFailure());
}

export default function*() {
  yield fork(authRegistrationRequestWatcher);
  yield fork(authRegistrationSuccessWatcher);
  yield fork(authAuthorizationRequestWatcher);
  yield fork(authAuthorizationSuccessWatcher);
}
