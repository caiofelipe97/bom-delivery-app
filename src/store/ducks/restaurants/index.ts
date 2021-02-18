import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import { Restaurant } from '~/types';
import { RestaurantsState } from './types';

/* Initial State */
const initialState: RestaurantsState = {
  allRestaurants: [],
  filteredRestaurants: [],
};

interface successGetAllRestaurantsPayload {
  data: Restaurant[];
}
const successGetAllRestaurants = (
  state = initialState,
  { data }: successGetAllRestaurantsPayload,
): RestaurantsState => ({
  ...state,
  allRestaurants: data,
});

interface successGetFilteredRestaurantsPayload {
  data: Restaurant[];
}
const successGetFilteredRestaurants = (
  state = initialState,
  { data }: successGetFilteredRestaurantsPayload,
): RestaurantsState => ({
  ...state,
  filteredRestaurants: data,
});

const solicitation = {
  [Types.SUCCESS_GET_ALL_RESTAURANTS]: successGetAllRestaurants,
  [Types.SUCCESS_GET_FILTERED_RESTAURANTS]: successGetFilteredRestaurants,
};

export default createReducer(initialState, solicitation);
