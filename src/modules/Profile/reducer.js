import { handleActions } from 'redux-actions';
import { profileRequest, profileSuccess } from './actions';

const reducer = handleActions(
  {
    [profileRequest]: _state => ({
      ..._state,
      isLoading: true
    }),
    [profileSuccess]: (_state, action) => ({
      ..._state,
      isLoading: false,
      data: action.payload
    })
  },
  { isLoading: false, data: null }
);

export default reducer;
