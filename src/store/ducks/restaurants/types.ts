import { Restaurant } from '~/types';

export interface RestaurantsState {
  allRestaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
}
