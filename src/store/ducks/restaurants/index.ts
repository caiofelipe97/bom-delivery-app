import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import { RestaurantsState, Restaurant } from './types';

/* Initial State */
const initialState: RestaurantsState = {
  restaurantList: [],
};

interface successGetRestaurantListPayload {
  data: Restaurant[];
}
const successGetRestaurantList = (
  state = initialState,
  { data }: successGetRestaurantListPayload,
): RestaurantsState => ({
  ...state,
  restaurantList: data,
});

const solicitation = {
  [Types.SUCCESS_GET_RESTAURANT_LIST]: successGetRestaurantList,
};

export default createReducer(initialState, solicitation);
