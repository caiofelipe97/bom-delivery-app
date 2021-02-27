import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import { Restaurant } from '~/types';
import { RestaurantsState } from './types';

/* Initial State */
const initialState: RestaurantsState = {
  allRestaurants: [],
  filteredRestaurants: [],
  numberOfFilters: 0,

  sortFilter: '',
  paymentMethodFilter: '',
  categoriesFilter: [],
};

interface successGetAllRestaurantsPayload {
  data: Restaurant[];
  numberOfFilters: number;
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

interface setFiltersPayload {
  sortFilter: string;
  paymentMethodFilter: string;
  categoriesFilter: string[];
  numberOfFilters: number;
}
const setFilters = (
  state = initialState,
  {
    sortFilter,
    paymentMethodFilter,
    categoriesFilter,
    numberOfFilters,
  }: setFiltersPayload,
): RestaurantsState => ({
  ...state,
  sortFilter,
  paymentMethodFilter,
  categoriesFilter,
  numberOfFilters,
});

const solicitation = {
  [Types.SUCCESS_GET_ALL_RESTAURANTS]: successGetAllRestaurants,
  [Types.SUCCESS_GET_FILTERED_RESTAURANTS]: successGetFilteredRestaurants,
  [Types.SET_FILTERS]: setFilters,
};

export default createReducer(initialState, solicitation);
