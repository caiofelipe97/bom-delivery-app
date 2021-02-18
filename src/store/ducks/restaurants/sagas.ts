import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
  Creators as restaurantsCreators,
  Types as restaurantsTypes,
} from './actions';

import { Creators as loadingCreators } from '../loading/actions';

import { getAll, getByCategory } from './service';

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

interface getRestaurantsByCategorypProps {
  category: string;
}
function* getRestaurantsByCategory({
  category,
}: getRestaurantsByCategorypProps) {
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
