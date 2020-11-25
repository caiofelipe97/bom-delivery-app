import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F6F2F8' },
    }}
  >
    <App.Screen name="Home" component={Home} />
  </App.Navigator>
);

export default AppRoutes;
