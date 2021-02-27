import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getAllRestaurants: [],
  successGetAllRestaurants: ['data'],
  successGetFilteredRestaurants: ['data'],
  getFilteredRestaurants: [
    'sortFilter',
    'paymentMethodFilter',
    'categoriesFilter',
    'selectedCategory',
  ],
  getRestaurantsByCategory: ['category'],
  setFilters: [
    'sortFilter',
    'paymentMethodFilter',
    'categoriesFilter',
    'numberOfFilters',
  ],
});
