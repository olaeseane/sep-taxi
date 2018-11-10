import reducer from '../../modules/Profile';
import { call, put, takeLatest } from 'redux-saga/effects';
import { profileRequest, profileSuccess, profileFailure } from '../../modules/Profile/actions';
import { profileRequestWatcher, profileRequestFlow } from '../../modules/Profile/sagas';
import { request } from '../../modules/utils/network';

describe('Profile reducer  -> ', () => {
  it('PROFILE/REQUEST устанавливает isLoading=true', () => {
    const initialStore = { isLoading: false, data: null };
    const testStore = { isLoading: true, data: null };
    const state1 = reducer(
      initialStore,
      profileRequest(
        "'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjU1IiwiaWQiOiJnV0xRQjVZdFZidjJFVElFUmNZaWQiLCJpYXQiOjE1NDE4MDM4Njd9.vJKVh5tW3TG2M5ocOe_TB8LeLgzefl0-DXHRVuPNyRg"
      )
    );
    expect(state1).toEqual(testStore);
  });

  it('PROFILE/SUCCESS записывает данные в data и устанавливает isLoading=false', () => {
    const initialStore = { isLoading: true, data: null };
    const testStore = {
      isLoading: false,
      data: {
        ok: true,
        email: 'test@test.io',
        id: 'PFr1fb~1Mz6OIGk8TDM_J',
        firstname: null,
        lastname: null,
        private: 'Это приватная информация доступная лишь авторизированным пользователям'
      }
    };
    const state1 = reducer(
      initialStore,
      profileSuccess({
        ok: true,
        email: 'test@test.io',
        id: 'PFr1fb~1Mz6OIGk8TDM_J',
        firstname: null,
        lastname: null,
        private: 'Это приватная информация доступная лишь авторизированным пользователям'
      })
    );
    expect(state1).toEqual(testStore);
    expect(state1.isLoading).toBeFalsy();
  });
});

describe('Profile sagas  -> ', () => {
  describe('profileRequestWatcher', () => {
    it('1', () => {
      const iterator = profileRequestWatcher();
      expect(iterator.next().value).toEqual(takeLatest(profileRequest, profileRequestFlow));
    });
  });

  describe('profileRequestFlow success', () => {
    const testAction = { payload: 'test' };
    const iterator = profileRequestFlow(testAction);
    it('1', () => {
      const mockData = {
        path: '/user/me',
        method: 'GET',
        token: 'test'
      };
      expect(iterator.next().value).toEqual(call(request, mockData));
    });

    it('2', () => {
      expect(iterator.next({ message: 'success' }).value).toEqual(
        put(profileSuccess({ message: 'success' }))
      );
    });
  });

  describe('profileRequestFlow failure', () => {
    const testAction = { payload: 'test' };
    const iterator = profileRequestFlow(testAction);
    iterator.next();
    it('1', () => {
      expect(iterator.throw({ message: 'failure' }).value).toEqual(
        put(profileFailure({ message: 'failure' }))
      );
    });
  });
});