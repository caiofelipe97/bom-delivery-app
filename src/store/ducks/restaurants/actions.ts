import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getAllRestaurants: [],
  successGetAllRestaurants: ['data'],
  successGetFilteredRestaurants: ['data'],
  getRestaurantsByCategory: ['category'],
});
