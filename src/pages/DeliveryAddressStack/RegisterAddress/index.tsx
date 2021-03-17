import React from 'react';
import { Text, Dimensions, StatusBar } from 'react-native';

import { useRoute } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Container } from './styles';

const { width, height } = Dimensions.get('window');

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
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location?.latitude || -7.060714,
          longitude: location?.longitude || -35.763305,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
        style={{
          alignSelf: 'flex-start',
          width,
          height: height / 4,
          marginTop: StatusBar.currentHeight,
        }}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude || -7.060714,
            longitude: location?.longitude || -35.763305,
          }}
        />
      </MapView>
      <Text>{main_text}</Text>
      <Text>{secondary_text}</Text>
      <Text>Latitude: {location?.latitude?.toFixed(7)}</Text>
      <Text>Longitude: {location?.longitude?.toFixed(7)}</Text>
    </Container>
  );
};

export default RegisterAddress;
