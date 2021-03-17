import React, { useCallback, useMemo } from 'react';
import { Platform, View, Image } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

import BackArrow from '../assets/backArrow.png';
import { Creators as restaurantsCreators } from '../store/ducks/restaurants/actions';

import FilterButton from '../components/FilterButton';

import Home from '../pages/HomeStack/Home';
import List from '../pages/HomeStack/List';
import Filters from '../pages/HomeStack/Filters';
import DeliveryAddress from '../pages/DeliveryAddressStack/DeliveryAddress';
import SearchAddress from '../pages/DeliveryAddressStack/SearchAddress';
import RegisterAddress from '../pages/DeliveryAddressStack/RegisterAddress';
import Orders from '../pages/OrderStack/Orders';
import Search from '../pages/SearchStack/Search';
import Profile from '../pages/ProfileStack/Profile';
import { ApplicationState } from '~/store';
import { RestaurantsState } from '~/store/ducks/restaurants/types';

type AppStackParamList = {
  Home: undefined;
  List: { category: string | undefined };
  Filters: undefined;
  DeliveryAddressStack: undefined;
  DeliveryAddress: undefined;
  RegisterAddress: undefined;
  SearchAddress: undefined;
  Orders: undefined;
  Search: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

const Tab = createBottomTabNavigator();

const HomeStackNavigator: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { numberOfFilters } = useSelector<ApplicationState, RestaurantsState>(
    state => state.restaurants,
  );

  const handleFiltersPress = useCallback(
    selectedCategory => {
      navigation.navigate('Filters', { selectedCategory });
    },
    [navigation],
  );

  const hasFilter = useMemo(() => {
    return numberOfFilters > 0;
  }, [numberOfFilters]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F6F2F8' },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="List"
        component={List}
        options={({ route }) => ({
          title: route?.params?.category?.toUpperCase(),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F2F8',
            elevation: 0,
          },
          headerTintColor: '#78308C',
          headerTitleAlign: 'center',
          headerBackTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleStyle: {
            color: '#000',
            fontSize: 18,
          },
          headerBackImage: () => (
            <RectButton
              style={{
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                dispatch(restaurantsCreators.setFilters('', '', [], 0));
              }}
            >
              <Image source={BackArrow} />
            </RectButton>
          ),

          headerRight: () => (
            <View style={{ paddingRight: 12 }}>
              <FilterButton
                handleFiltersPress={() => {
                  handleFiltersPress(route?.params?.category);
                }}
                hasFilter={hasFilter}
                numberOfFilters={numberOfFilters}
              />
            </View>
          ),
        })}
      />
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

const HomeTabs: React.FC = () => {
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
              size={focused ? 24 : 22}
              style={{
                color: focused ? '#78308C' : '#3E4462',
              }}
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
              size={focused ? 24 : 22}
              style={{ color: focused ? '#78308C' : '#3E4462' }}
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
              size={focused ? 24 : 22}
              style={{ color: focused ? '#78308C' : '#3E4462' }}
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
              size={focused ? 24 : 22}
              style={{ color: focused ? '#78308C' : '#3E4462' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DeliveryAddressStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F6F2F8' },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="DeliveryAddress"
        component={DeliveryAddress}
        options={() => ({
          title: 'ENDEREÇO DE ENTREGA',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F2F8',
            elevation: 0,
          },
          headerTintColor: '#78308C',
          headerTitleAlign: 'center',
          headerBackTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleStyle: {
            color: '#000',
            fontSize: 18,
            fontFamily: 'RobotoSlab-Regular',
          },
        })}
      />

      <Stack.Screen name="SearchAddress" component={SearchAddress} />
      <Stack.Screen name="RegisterAddress" component={RegisterAddress} />
    </Stack.Navigator>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F6F2F8' },
      }}
    >
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen
        name="Filters"
        component={Filters}
        options={() => ({
          title: 'FILTROS',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#F6F2F8',
            elevation: 0,
          },
          headerTintColor: '#78308C',
          headerTitleAlign: 'center',
          headerBackTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleStyle: {
            color: '#000',
            fontSize: 18,
            fontFamily: 'RobotoSlab-Regular',
          },
        })}
      />
      <Stack.Screen
        name="DeliveryAddressStack"
        component={DeliveryAddressStackNavigator}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
