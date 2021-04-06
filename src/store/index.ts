import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import { DeliveryAddressState } from './ducks/deliveryAddress/types';
import { LoadingState } from './ducks/loading/types';
import { RestaurantsState } from './ducks/restaurants/types';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  restaurants: RestaurantsState;
  loading: LoadingState;
  deliveryAddress: DeliveryAddressState;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
