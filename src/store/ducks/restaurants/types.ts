import { Restaurant } from '~/types';

export interface RestaurantsState {
  allRestaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  numberOfFilters: number;
  sortFilter: string;
  paymentMethodFilter: string;
  categoriesFilter: string[];
}
