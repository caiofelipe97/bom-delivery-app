/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all } from 'typed-redux-saga';

import restaurants from './restaurants/sagas';
import deliveryAddress from './deliveryAddress/sagas';

export default function* rootSaga() {
  return yield* all([restaurants(), deliveryAddress()]);
}
