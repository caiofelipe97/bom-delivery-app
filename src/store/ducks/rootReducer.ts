import { combineReducers } from 'redux';

import restaurants from './restaurants';
import loading from './loading';
import deliveryAddress from './deliveryAddress';

export default combineReducers({
  restaurants,
  loading,
  deliveryAddress,
});
