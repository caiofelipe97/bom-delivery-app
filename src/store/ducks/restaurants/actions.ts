import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getAllRestaurants: [],
  successGetRestaurantList: ['data'],
  getRestaurantsByCategory: ['category'],
});
