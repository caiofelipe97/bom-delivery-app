import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import restaurants from './restaurants';
import loading from './loading';
import deliveryAddress from './deliveryAddress';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading'], // loading will not be persisted
};

const rootReducer = combineReducers({
  restaurants,
  loading,
  deliveryAddress,
});

export default persistReducer(rootPersistConfig, rootReducer);
