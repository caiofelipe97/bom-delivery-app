import React, { useState, useEffect, useCallback } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';

import GpsIcon from '~/assets/gps-icon.svg';
import SearchIcon from '~/assets/search-icon.svg';
import InvisibleButton from './InvisibleButton';
import DeliveryAddressCard from './DeliveryAddressCard';

import { Container, DeliveryAddressesContainer } from './styles';

interface Coordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

const DeliveryAddress: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    Geocoder.init('AIzaSyCtEkNUnkbFXMlhhamVOPgPZGm_0PtpEFw'); // use a valid API key
    const checkPermissions = async () => {
      setLoadingLocation(true);
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
        Geolocation.getCurrentPosition(
          ({ coords }) => {
            setCoordinates(coords);
            setLoadingLocation(false);
          },
          error => {
            setLoadingLocation(false);
            console.log(error);
          },
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
        );
      } else {
        const permissionGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (permissionGranted) {
          Geolocation.getCurrentPosition(
            async ({ coords }) => {
              setCoordinates(coords);
              if (coords?.latitude && coords?.longitude) {
                try {
                  const json = await Geocoder.from(
                    coords.latitude,
                    coords.longitude,
                  );

                  const { formatted_address } = json.results[0];
                  setCurrentLocation(formatted_address);
                  setLoadingLocation(false);
                } catch (error) {
                  setLoadingLocation(false);
                  setCurrentLocation(null);
                }
              } else {
                setLoadingLocation(false);
                setCurrentLocation(null);
              }
            },
            error => {
              console.log(error);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
          );
        }
      }
    };
    checkPermissions();
  }, []);

  const handleSearchAddress = useCallback(() => {
    navigation.navigate('SearchAddress');
  }, [navigation]);

  return (
    <Container>
      <InvisibleButton
        title="Usar localização atual"
        subTitle={
          loadingLocation
            ? 'Carregando...'
            : currentLocation || 'Ativar localização'
        }
        Icon={GpsIcon}
        onPress={() => {
          console.log('Usar localização atual');
        }}
      />
      <InvisibleButton
        title="Pesquisar endereço"
        Icon={SearchIcon}
        onPress={handleSearchAddress}
      />
      <DeliveryAddressesContainer>
        <DeliveryAddressCard
          selected
          address="R. Maria Lima, 33"
          region="Alagoa Nova - PB"
          complement="Próximo ao colégio Monsenhor Borges"
        />
        <DeliveryAddressCard
          address="R. Álvaro Machado, 130"
          region="Alagoa Nova - PB"
          complement="Rádio Piráua FM"
        />
        <DeliveryAddressCard
          address="R. Ver. Clementino Leite, 131"
          region="Alagoa Nova - PB"
          complement="Ao lado do cartório"
        />
        <DeliveryAddressCard
          address="R. Luiza Bezerra Mota, 720"
          region="Campina Grande - PB"
          complement="Rua do Motiva"
        />
      </DeliveryAddressesContainer>
    </Container>
  );
};

export default DeliveryAddress;
