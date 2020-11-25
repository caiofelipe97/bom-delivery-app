import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CellphoneConfirmation from '../pages/PhoneNumberConfirmation';
import EmailConfirmation from '../pages/EmailConfirmation';
import EmailCodeValidation from '../pages/EmailCodeValidation';
import PhoneNumberConfirmation from '../pages/PhoneNumberConfirmation';
import PhoneNumberValidation from '../pages/PhoneNumberValidation';

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
