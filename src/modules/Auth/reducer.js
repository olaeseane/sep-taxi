import { handleActions } from 'redux-actions';
import {
  authAuthorizationRequest,
  authRegistrationFailure,
  authSetToken,
  authSetUserCredentials
} from './actions';

const reducer = handleActions(
  {
    [authSetUserCredentials]: (_state, action) => ({
      ..._state,
      email: action.payload.email,
      id: action.payload.id
    }),
    [authRegistrationFailure]: (_state) => ({
      ..._state,
      id: null,
      email: null,
      jwt_token: null
    }),
    [authSetToken]: (_state, action) => ({
      ..._state,
      jwt_token: action.payload
    }),
    [authAuthorizationRequest]: (_state, action) => {
      return {
        ..._state,
        email: action.payload.email
      };
    }
  },
  { id: null, email: null, jwt_token: null }
);

export default reducer;
