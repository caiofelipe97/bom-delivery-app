import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/AuthStack/SignIn';
import SignUp from '../pages/AuthStack/SignUp';
import CellphoneConfirmation from '../pages/AuthStack/PhoneNumberConfirmation';
import EmailConfirmation from '../pages/AuthStack/EmailConfirmation';
import EmailCodeValidation from '../pages/AuthStack/EmailCodeValidation';
import PhoneNumberConfirmation from '../pages/AuthStack/PhoneNumberConfirmation';
import PhoneNumberValidation from '../pages/AuthStack/PhoneNumberValidation';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#F6F2F8' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen
      name="CellphoneConfirmation"
      component={CellphoneConfirmation}
    />
    <Auth.Screen name="EmailConfirmation" component={EmailConfirmation} />
    <Auth.Screen name="EmailCodeValidation" component={EmailCodeValidation} />
    <Auth.Screen
      name="PhoneNumberConfirmation"
      component={PhoneNumberConfirmation}
    />
    <Auth.Screen
      name="PhoneNumberValidation"
      component={PhoneNumberValidation}
    />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
