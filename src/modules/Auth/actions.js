import { createAction } from 'redux-actions';

export const authRegistrationRequest = createAction('AUTH/REGISTRATION_REQUEST');
export const authRegistrationSuccess = createAction('AUTH/REGISTRATION_SUCCESS');
export const authRegistrationFailure = createAction('AUTH/REGISTRATION_FAILURE');

export const authAuthorizationRequest = createAction(
  'AUTH/AUTHORIZATION_REQUEST'
);
export const authAuthorizationSuccess = createAction(
  'AUTH/AUTHORIZATION_SUCCESS'
);
export const authAuthorizationFailure = createAction(
  'AUTH/AUTHORIZATION_FAILURE'
);

export const authSetUserCredentials = createAction('AUTH/SET_USER_CREDENTIALS');
export const authSetToken = createAction('AUTH/SET_TOKEN');
