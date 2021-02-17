import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
  Creators as restaurantsCreators,
  Types as restaurantsTypes,
} from './actions';

import { getAll, getByCategory } from './service';

function* getAllRestaurants() {
  try {
    const data = yield call(getAll);
    yield put(restaurantsCreators.successGetRestaurantList(data));
  } catch (error) {
    console.log(error);
  }
}

interface getRestaurantsByCategorypProps {
  category: string;
}
function* getRestaurantsByCategory({
  category,
}: getRestaurantsByCategorypProps) {
  try {
    console.log('getRestaurantsByCategory');
    console.log(category);
    const data = yield call(getByCategory, category);
    yield put(restaurantsCreators.successGetRestaurantList(data));
  } catch (error) {
    console.log(error);
  }
}

export function* restaurants() {
  return yield all([
    takeLatest(restaurantsTypes.GET_ALL_RESTAURANTS, getAllRestaurants),
    takeLatest(
      restaurantsTypes.GET_RESTAURANTS_BY_CATEGORY,
      getRestaurantsByCategory,
    ),
  ]);
}

export default restaurants;
