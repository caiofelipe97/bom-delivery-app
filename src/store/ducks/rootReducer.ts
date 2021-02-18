import { combineReducers } from 'redux';

import restaurants from './restaurants';
import loading from './loading';

export default combineReducers({
  restaurants,
  loading,
});
