import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Creators as deliveryAddressActions } from '~/store/ducks/deliveryAddress/actions';
import GpsIcon from '~/assets/gps-icon.svg';
import SearchIcon from '~/assets/search-icon.svg';
import InvisibleButton from './InvisibleButton';
import DeliveryAddressCard from './DeliveryAddressCard';

import { Container, DeliveryAddressesContainer } from './styles';
import { DeliveryAddressState } from '~/store/ducks/deliveryAddress/types';
import { ApplicationState } from '~/store';

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
  const { userAddresses, selectedDeliveryAddress } = useSelector<
    ApplicationState,
    DeliveryAddressState
  >(state => state.deliveryAddress);

  const dispatch = useDispatch();
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
        } else {
          setLoadingLocation(false);
        }
      }
    };
    checkPermissions();
  }, []);

  console.log(userAddresses);

  const handleSearchAddress = useCallback(() => {
    navigation.navigate('SearchAddress');
  }, [navigation]);

  const handleOnSelectDeliveryAddress = useCallback(
    userDeliveryAddress => {
      dispatch(
        deliveryAddressActions.setSelectedDeliveryAddress(userDeliveryAddress),
      );
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Home' }],
        }),
      );
    },
    [dispatch, navigation],
  );

  const orderedUserAddresses = useMemo(() => {
    if (selectedDeliveryAddress?.id) {
      const findSelectedUserAddress = userAddresses.find(
        userAddress => userAddress.id === selectedDeliveryAddress.id,
      );
      const filteredUserAddresses = userAddresses.filter(
        userAddress => userAddress.id !== selectedDeliveryAddress.id,
      );
      if (findSelectedUserAddress) {
        return [findSelectedUserAddress, ...filteredUserAddresses];
      }
      return userAddresses;
    }
    return userAddresses;
  }, [userAddresses, selectedDeliveryAddress]);

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
        {orderedUserAddresses.map(userDeliveryAddress => (
          <DeliveryAddressCard
            key={userDeliveryAddress.id}
            address={
              userDeliveryAddress.addressType === 'place'
                ? userDeliveryAddress.mainAddress
                : userDeliveryAddress.mainText
            }
            region={
              userDeliveryAddress.addressType === 'place'
                ? `${userDeliveryAddress.mainText} - ${userDeliveryAddress.secondaryText}`
                : userDeliveryAddress.secondaryText
            }
            complement={userDeliveryAddress.referencePoint}
            selected={selectedDeliveryAddress.id === userDeliveryAddress.id}
            handleOnSelect={() =>
              handleOnSelectDeliveryAddress(userDeliveryAddress)
            }
          />
        ))}
      </DeliveryAddressesContainer>
    </Container>
  );
};

export default DeliveryAddress;
