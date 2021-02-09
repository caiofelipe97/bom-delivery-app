import { all } from 'redux-saga/effects';

import restaurants from './restaurants/sagas';

export default function* rootSaga() {
  return yield all([restaurants()]);
}
