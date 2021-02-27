import { takeLatest, put, call, all } from 'redux-saga/effects';
import { number } from 'yup';
import { Restaurant } from '~/types';
import {
  Creators as restaurantsCreators,
  Types as restaurantsTypes,
} from './actions';

import { Creators as loadingCreators } from '../loading/actions';

import { getAll, getByCategory, getByFilters } from './service';
import store from '~/store';

function* getAllRestaurants() {
  try {
    yield put(loadingCreators.start());
    const data = yield call(getAll);
    yield put(restaurantsCreators.successGetAllRestaurants(data));
    yield put(loadingCreators.stop());
  } catch (error) {
    console.log(error);
    yield put(loadingCreators.stop());
  }
}

interface getRestaurantsByCategoryProps {
  category: string;
}
function* getRestaurantsByCategory({
  category,
}: getRestaurantsByCategoryProps) {
  try {
    yield put(loadingCreators.start());
    const data = yield call(getByCategory, category);
    yield put(restaurantsCreators.successGetFilteredRestaurants(data));
    yield put(loadingCreators.stop());
  } catch (error) {
    console.log(error);
    yield put(loadingCreators.stop());
  }
}

interface getFilteredRestaurantsProps {
  sortFilter: string;
  paymentMethodFilter: string;
  categoriesFilter: string[];
  selectedCategory?: string;
}
function* getFilteredRestaurants({
  sortFilter,
  paymentMethodFilter,
  categoriesFilter,
  selectedCategory = '',
}: getFilteredRestaurantsProps) {
  try {
    yield put(loadingCreators.start());
    let data = yield call(
      getByFilters,
      sortFilter,
      paymentMethodFilter,
      categoriesFilter,
    );
    let numberOfFilters = 0;
    if (
      (sortFilter && sortFilter === 'deliveryPrice') ||
      sortFilter === 'timeToDelivery'
    ) {
      numberOfFilters += 1;
    }
    if (paymentMethodFilter && paymentMethodFilter === 'Máquina móvel') {
      numberOfFilters += 1;
    }
    if (categoriesFilter && categoriesFilter.length > 0) {
      numberOfFilters += categoriesFilter.length;
    }
    if (selectedCategory) {
      data = data.filter((restaurant: Restaurant) =>
        restaurant.foods.includes(selectedCategory),
      );
      yield put(restaurantsCreators.successGetFilteredRestaurants(data));
    } else {
      yield put(restaurantsCreators.successGetAllRestaurants(data));
    }
    yield put(
      restaurantsCreators.setFilters(
        sortFilter,
        paymentMethodFilter,
        categoriesFilter,
        numberOfFilters,
      ),
    );
    yield put(loadingCreators.stop());
  } catch (error) {
    console.log(error);
    yield put(loadingCreators.stop());
  }
}

export function* restaurants() {
  return yield all([
    takeLatest(restaurantsTypes.GET_ALL_RESTAURANTS, getAllRestaurants),
    takeLatest(
      restaurantsTypes.GET_RESTAURANTS_BY_CATEGORY,
      getRestaurantsByCategory,
    ),
    takeLatest(
      restaurantsTypes.GET_FILTERED_RESTAURANTS,
      getFilteredRestaurants,
    ),
  ]);
}

export default restaurants;
