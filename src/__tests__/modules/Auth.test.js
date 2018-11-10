import reducer from '../../modules/Auth/index';
import {
  authRegistrationRequest,
  authRegistrationSuccess,
  authRegistrationFailure,
  authAuthorizationRequest,
  authAuthorizationSuccess,
  authSetUserCredentials,
  authSetToken
} from '../../modules/Auth/index';

describe('Auth reducer -> ', () => {
  it('AUTH/AUTHORIZATION_REQUEST не меняет store', () => {
    const initialStore = { email: null, id: null, jwt_token: null };
    const testStore = { email: null, id: null, jwt_token: null };
    const state1 = reducer(
      initialStore,
      authRegistrationRequest({
        email: 'test@test.io',
        password: 'welcome'
      })
    );
    expect(state1).toEqual(testStore);
  });

  it('AUTH/AUTHORIZATION_SUCCESS не меняет store', () => {
    const initialStore = { email: null, id: null, jwt_token: null };
    const testStore = { email: null, id: null, jwt_token: null };
    const state1 = reducer(
      initialStore,
      authRegistrationSuccess({
        ok: true,
        email: 'test@test.io',
        id: 'gWLQB5YtVbv2ETIERcYid',
        firstname: null,
        lastname: null,
        private: 'Это приватная информация доступная лишь авторизированным пользователям'
      })
    );
    expect(state1).toEqual(testStore);
  });

  it('AUTH/REGISTRATION_FAILURE устанавливает все поля store в null', () => {
    const initialStore = {
      email: 'test@test.io',
      id: 'gWLQB5YtVbv2ETIERcYid',
      jwt_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    };
    const testStore = { email: null, id: null, jwt_token: null };
    const state1 = reducer(initialStore, authRegistrationFailure());
    expect(state1).toEqual(testStore);
  });

  it('AUTH/AUTHORIZATION_REQUEST устанавливается email', () => {
    const initialStore = { email: null, id: null, jwt_token: null };
    const testStore = { email: 'test@test.io', id: null, jwt_token: null };
    const state1 = reducer(
      initialStore,
      authAuthorizationRequest({
        email: 'test@test.io',
        password: 'welcome'
      })
    );
    expect(state1).toEqual(testStore);
  });

  it('AUTH/AUTHORIZATION_SUCCESS не меняет store', () => {
    const initialStore = { email: 'test@test.io', id: null, jwt_token: null };
    const testStore = { email: 'test@test.io', id: null, jwt_token: null };
    const state1 = reducer(
      initialStore,
      authAuthorizationSuccess({
        ok: true,
        user: {
          email: 'test@test.io',
          id: 'PFr1fb~1Mz6OIGk8TDM_J'
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpZCI6IlBGcjFmYn4xTXo2T0lHazhURE1fSiIsImlhdCI6MTU0MTgwMjIxMX0.XJdPjDFRz8uVnRrib5MMqb46j6__icqYsSdzG2-hsTo'
      })
    );
    expect(state1).toEqual(testStore);
  });

  it('AUTH/SET_USER_CREDENTIALS устанавливает id и email в store', () => {
    const initialStore = { email: null, id: null, jwt_token: null };
    const testStore = { email: 'test@test.io', id: 'PFr1fb~1Mz6OIGk8TDM_J', jwt_token: null };
    const state1 = reducer(
      initialStore,
      authSetUserCredentials({ email: 'test@test.io', id: 'PFr1fb~1Mz6OIGk8TDM_J' })
    );
    expect(state1).toEqual(testStore);
  });

  it(' AUTH/SET_TOKEN устанавливает jwt_token в store', () => {
    const initialStore = {
      id: 'PFr1fb~1Mz6OIGk8TDM_J',
      email: 'test@test.io',
      jwt_token: null
    };
    const testStore = {
      id: 'PFr1fb~1Mz6OIGk8TDM_J',
      email: 'test@test.io',
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJpZCI6IlBGcjFmYn4xTXo2T0lHazhURE1fSiIsImlhdCI6MTU0MTcwOTc5NH0.AJelhYIHYTRgPnNfMEt_DC8QF9OE9nPtpjgUN_Pb1LA'
    };
    const state1 = reducer(
      initialStore,
      authSetToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJpZCI6IlBGcjFmYn4xTXo2T0lHazhURE1fSiIsImlhdCI6MTU0MTcwOTc5NH0.AJelhYIHYTRgPnNfMEt_DC8QF9OE9nPtpjgUN_Pb1LA'
      )
    );
    expect(state1).toEqual(testStore);
  });
});
