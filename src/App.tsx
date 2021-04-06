import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';
import { store, persistor } from './store';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar translucent backgroundColor="#F6F2F8" barStyle="dark-content" />
    <Provider store={store}>
      <AppProvider>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: '#F6F2F8' }}>
            <Routes />
          </View>
        </PersistGate>
      </AppProvider>
    </Provider>
  </NavigationContainer>
);

export default App;
