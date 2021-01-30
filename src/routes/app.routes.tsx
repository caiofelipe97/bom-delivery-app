import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Home from '../pages/HomeStack/Home';
import Orders from '../pages/OrderStack/Orders';
import Search from '../pages/SearchStack/Search';
import Profile from '../pages/ProfileStack/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F6F2F8' },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const OrderStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F6F2F8' },
      }}
    >
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
};

const SearchStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F6F2F8' },
      }}
    >
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F6F2F8' },
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        safeAreaInsets: {
          bottom: 0,
        },
        style: {
          height: Platform.OS === 'android' ? 65 : 80,
          paddingBottom: Platform.OS === 'ios' ? 16 : 0,
          position: 'absolute',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -7,
          },
          shadowOpacity: 0.09,
          shadowRadius: 6.27,
        },
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <FeatherIcon
              name="home"
              size={20}
              color={focused ? '#78308c' : '3E4462'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <FeatherIcon
              name="shopping-bag"
              size={20}
              color={focused ? '#78308c' : '3E4462'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <FeatherIcon
              name="search"
              size={20}
              color={focused ? '#78308c' : '3E4462'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <FeatherIcon
              name="user"
              size={20}
              color={focused ? '#78308c' : '3E4462'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;
