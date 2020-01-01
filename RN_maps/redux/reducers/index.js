import { combineReducers } from 'redux';
import mapScreenReducer from './mapScreen'
export default combineReducers({
  mapScreen : mapScreenReducer,
});
