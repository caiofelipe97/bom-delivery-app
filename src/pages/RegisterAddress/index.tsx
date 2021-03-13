import React from 'react';
import { Text } from 'react-native';

import { useRoute } from '@react-navigation/native';

import { Container } from './styles';

interface RouteParams {
  main_text: string;
  secondary_text: string;
  streetName?: string;
  streetNumber?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  location: {
    latitude?: number;
    longitude?: number;
  };
}

const RegisterAddress: React.FC = () => {
  const { params } = useRoute();
  const { main_text, secondary_text, location } = params as RouteParams;

  return (
    <Container>
      <Text>{main_text}</Text>
      <Text>{secondary_text}</Text>
      <Text>Latitude: {location?.latitude?.toFixed(7)}</Text>
      <Text>Longitude: {location?.longitude?.toFixed(7)}</Text>
    </Container>
  );
};

export default RegisterAddress;
