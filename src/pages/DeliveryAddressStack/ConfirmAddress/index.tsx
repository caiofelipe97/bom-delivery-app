import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Platform, Dimensions, StatusBar, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import haversine from 'haversine';

import MapView, {
  PROVIDER_GOOGLE,
  Region,
  AnimatedRegion,
  MarkerAnimated,
  AnimatedRegionTimingConfig,
  Circle,
} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ApplicationState } from '~/store';
import { DeliveryAddressState } from '~/store/ducks/deliveryAddress/types';
import PurpleMarker from '~/assets/purpleMarker.png';
import { Creators as deliveryAddressCreators } from '~/store/ducks/deliveryAddress/actions';

import {
  Container,
  BackButtonContainer,
  BackButton,
  FixedTopView,
  LinearGradientView,
  LinearGradientContainer,
  MainAddressText,
  SecondaryAddressText,
  FixedBottomView,
} from './styles';
import Button from '~/components/Button';

const { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.001;

const ConfirmAddress: React.FC = () => {
  const marker = useRef<MarkerAnimated>(null);
  const map = useRef<MapView>(null);

  const dispatch = useDispatch();

  const [coords, setCoords] = useState(
    new AnimatedRegion({
      latitude: -7.060714,
      longitude: -35.763305,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  );
  const [latitude, setLatitude] = useState(-7.060714);
  const [longitude, setLongitude] = useState(-35.763305);
  const [maxDistance, setMaxDistance] = useState(false);
  const navigation = useNavigation();

  const { newDeliveryAddress } = useSelector<
    ApplicationState,
    DeliveryAddressState
  >(state => state.deliveryAddress);

  useEffect(() => {
    if (newDeliveryAddress) {
      setCoords(
        new AnimatedRegion({
          latitude: newDeliveryAddress.location.latitude,
          longitude: newDeliveryAddress.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      );
      setLatitude(newDeliveryAddress.location.latitude);
      setLongitude(newDeliveryAddress.location.longitude);
    }
  }, [newDeliveryAddress]);

  const handleConfirmAddress = useCallback(() => {
    dispatch(
      deliveryAddressCreators.setNewDeliveryAddress({
        ...newDeliveryAddress,
        location: {
          latitude,
          longitude,
        },
      }),
    );
    navigation.navigate('RegisterAddress');
  }, [dispatch, newDeliveryAddress, latitude, longitude, navigation]);

  const handleRegionChange = useCallback(
    ({ latitude: newLatitude, longitude: newLongitude }: Region) => {
      const newCoordinate = {
        latitude: newLatitude,
        longitude: newLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      const originalCoordinate = {
        latitude: newDeliveryAddress.location.latitude,
        longitude: newDeliveryAddress.location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      const distance = haversine(originalCoordinate, newCoordinate);

      if (distance >= 0.5) {
        map.current?.animateCamera(
          {
            center: {
              latitude: newDeliveryAddress.location.latitude,
              longitude: newDeliveryAddress.location.longitude,
            },
          },
          {
            duration: 1000,
          },
        );
        marker.current?.animateMarkerToCoordinate(originalCoordinate, 1000);
        setMaxDistance(true);
        return;
      }

      const newAnimatedCoordinate = {
        latitude: newLatitude,
        longitude: newLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      } as AnimatedRegionTimingConfig;

      if (Platform.OS === 'android') {
        if (marker) {
          marker.current?.animateMarkerToCoordinate(newCoordinate); //  number of duration between points
          setLatitude(newLatitude);
          setLongitude(newLongitude);
        }
      } else {
        coords.timing(newAnimatedCoordinate).start();
        setLatitude(newLatitude);
        setLongitude(newLongitude);
      }
    },
    [
      coords,
      map,
      marker,
      newDeliveryAddress.location.latitude,
      newDeliveryAddress.location.longitude,
    ],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <BackButtonContainer>
        <BackButton onPress={() => handleGoBack()}>
          <FeatherIcon name="chevron-left" size={32} color="#78308C" />
        </BackButton>
      </BackButtonContainer>

      <LinearGradientView>
        <LinearGradientContainer colors={['#F6F2F8', 'transparent']} />
      </LinearGradientView>
      <FixedTopView>
        <MainAddressText>{newDeliveryAddress.mainAddress}</MainAddressText>
        <SecondaryAddressText>
          {newDeliveryAddress.secondaryText}
        </SecondaryAddressText>
      </FixedTopView>

      <MapView
        zoomEnabled={false}
        ref={map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: newDeliveryAddress.location.latitude,
          longitude: newDeliveryAddress.location.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onRegionChangeComplete={region => {
          handleRegionChange(region);
        }}
        style={{
          alignSelf: 'flex-start',
          width,
          height,
        }}
      >
        {maxDistance && (
          <Circle
            center={{
              latitude: newDeliveryAddress.location.latitude,
              longitude: newDeliveryAddress.location.longitude,
            }}
            radius={500}
            strokeWidth={2}
            strokeColor="#78308C"
            fillColor="rgba(120,48,140,0.25)"
          />
        )}

        <MarkerAnimated ref={marker} coordinate={coords}>
          <Image source={PurpleMarker} style={{ width: 40, height: 40 }} />
        </MarkerAnimated>
      </MapView>
      <FixedBottomView>
        <Button onPress={handleConfirmAddress}>Confirmar localização</Button>
      </FixedBottomView>
    </Container>
  );
};

export default ConfirmAddress;
