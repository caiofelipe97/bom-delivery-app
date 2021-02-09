import { takeLatest, put, call, all } from 'redux-saga/effects';
import {
  Creators as restaurantsCreators,
  Types as restaurantsTypes,
} from './actions';

import { getAll } from './service';

function* getAllRestaurants() {
  try {
    const data = yield call(getAll);
    yield put(restaurantsCreators.successGetRestaurantList(data));
  } catch (error) {
    console.log(error);
  }
}

export function* restaurants() {
  return yield all([
    takeLatest(restaurantsTypes.GET_ALL_RESTAURANTS, getAllRestaurants),
  ]);
}

export default restaurants;
