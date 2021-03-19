import React, { useCallback, useState, useRef } from 'react';
import { Alert, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityIndicator } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { Creators as deliveryAddressCreators } from '~/store/ducks/deliveryAddress/actions';

import {
  Container,
  BackButton,
  ModalContainer,
  ModalContent,
  ModalTitle,
  AddressMainText,
  AddressSecundaryText,
  NumberTextInput,
  SearchWithNumberButton,
  SearchWithNumberButtonText,
  AddressWithoutNumberButton,
  AddressWithoutNumberButtonText,
} from './styles';
import { DeliveryAddressState } from '~/store/ducks/deliveryAddress/types';
import { ApplicationState } from '~/store';

interface GetAddressProps {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  location: Geocoder.LatLng;
}

interface AddressAttrs {
  streetName?: string;
  streetNumber?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  CEP?: string;
  location: {
    latitude?: number;
    longitude?: number;
  };
}

const SearchAddress: React.FC = () => {
  const googlePlacesAutocompleteRef = useRef<GooglePlacesAutocompleteRef | null>(
    null,
  );
  const [number, setNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { newDeliveryAddress } = useSelector<
    ApplicationState,
    DeliveryAddressState
  >(state => state.deliveryAddress);

  const getAddress = useCallback(
    ({ address_components, location }: GetAddressProps): AddressAttrs => {
      const streetNumberAddressComponent = address_components.find(item =>
        item.types.includes('street_number'),
      );
      const streetNumber = streetNumberAddressComponent
        ? streetNumberAddressComponent.long_name
        : undefined;
      const streetNameAddressComponent = address_components.find(item =>
        item.types.includes('route'),
      );
      const streetName = streetNameAddressComponent
        ? streetNameAddressComponent.long_name
        : undefined;

      // Bairro
      const districtAddressComponent = address_components.find(item =>
        item.types.includes('sublocality'),
      );
      const district = districtAddressComponent
        ? districtAddressComponent.long_name
        : undefined;

      const cityAddressComponent = address_components.find(item =>
        item.types.includes('administrative_area_level_2'),
      );
      const city = cityAddressComponent
        ? cityAddressComponent.long_name
        : undefined;

      const stateAddressComponent = address_components.find(item =>
        item.types.includes('administrative_area_level_1'),
      );
      const state = stateAddressComponent
        ? stateAddressComponent.short_name
        : undefined;

      const countryAddressComponent = address_components.find(item =>
        item.types.includes('country'),
      );
      const country = countryAddressComponent
        ? countryAddressComponent.long_name
        : undefined;

      const CEPAddressComponent = address_components.find(item =>
        item.types.includes('postal_code'),
      );

      const CEP = CEPAddressComponent
        ? CEPAddressComponent.long_name
        : undefined;

      const latitude = location.lat;
      const longitude = location.lng;

      return {
        streetName,
        streetNumber,
        district,
        city,
        state,
        country,
        CEP,
        location: {
          latitude,
          longitude,
        },
      };
    },
    [],
  );

  const handleShowError = useCallback(() => {
    googlePlacesAutocompleteRef.current?.setAddressText('');
    Alert.alert('Endereço inválido', 'Por favor tente novamente.');
  }, [googlePlacesAutocompleteRef]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearchAddressWithNumber = useCallback(async () => {
    Geocoder.init('AIzaSyCtEkNUnkbFXMlhhamVOPgPZGm_0PtpEFw');
    const searchAddress = `${newDeliveryAddress.streetName}, ${number} - ${newDeliveryAddress.secondaryText}`;
    setModalVisible(!modalVisible);
    setLoading(true);
    try {
      const json = await Geocoder.from(searchAddress);
      if (json.results[0] && json.results[0].geometry.location) {
        const { address_components } = json.results[0];

        const { location } = json.results[0].geometry;
        const {
          streetName,
          streetNumber,
          district,
          city,
          state,
          country,
          CEP,
          location: { latitude, longitude },
        } = getAddress({ address_components, location });

        let main_text = newDeliveryAddress.mainAddress;
        if (streetNumber) {
          main_text = `${streetName}, ${streetNumber}`;
        } else {
          main_text = `${streetName}, ${number}`;
        }
        const secondaryText = `${district ? `${district}, ` : ''}${
          city ? `${city} - ` : ''
        }${state ? `${state}` : ''}
        `;

        setNumber('');
        setLoading(false);
        console.log(number);
        googlePlacesAutocompleteRef.current?.setAddressText('');
        dispatch(
          deliveryAddressCreators.setNewDeliveryAddress({
            mainAddress: main_text,
            mainText: main_text,
            secondaryText,
            streetName,
            streetNumber: streetNumber || number,
            noNumber: !!streetNumber,
            district,
            city,
            addressType: 'street',
            state,
            country,
            CEP,
            location: {
              latitude,
              longitude,
            },
          }),
        );
        navigation.navigate('RegisterAddress');
      }
    } catch (err) {
      setNumber('');
      setLoading(false);
      googlePlacesAutocompleteRef.current?.setAddressText('');
      handleShowError();
    }
  }, [
    dispatch,
    getAddress,
    handleShowError,
    modalVisible,
    navigation,
    newDeliveryAddress.mainAddress,
    newDeliveryAddress.secondaryText,
    newDeliveryAddress.streetName,
    number,
  ]);

  const handleOnPress = useCallback(
    (data, details = null) => {
      const { main_text } = data.structured_formatting;
      const location = details?.geometry.location;
      const address_components = details?.address_components;
      if (!address_components || !location || !location.lat || !location.lng) {
        handleShowError();
      } else {
        const {
          streetName,
          streetNumber,
          district,
          city,
          state,
          country,
          CEP,
          location: { latitude, longitude },
        } = getAddress({ address_components, location });
        let addressType;
        if (streetName && main_text.includes(streetName)) {
          addressType = 'street';
        } else {
          addressType = 'place';
        }
        if (!latitude || !longitude || !streetName) {
          handleShowError();
        } else if (streetNumber) {
          const noNumber = streetNumber === 'S/N';
          const mainText = `${streetName}${`, ${streetNumber}`}`;
          const secondaryText = `${district ? `${district}, ` : ''}${
            city ? `${city} - ` : ''
          }${state ? `${state}` : ''}
        `;
          googlePlacesAutocompleteRef.current?.setAddressText('');
          dispatch(
            deliveryAddressCreators.setNewDeliveryAddress({
              mainAddress: main_text,
              mainText,
              secondaryText,
              streetName,
              streetNumber,
              noNumber,
              district,
              city,
              state,
              country,
              addressType,
              CEP,
              location: {
                latitude,
                longitude,
              },
            }),
          );
          navigation.navigate('RegisterAddress');
        } else {
          const mainText = `${streetName}`;
          const secondaryText = `${district ? `${district}, ` : ''}${
            city ? `${city} - ` : ''
          }${state ? `${state}` : ''}
        `;
          dispatch(
            deliveryAddressCreators.setNewDeliveryAddress({
              mainAddress: main_text,
              mainText,
              secondaryText,
              streetName,
              streetNumber,
              district,
              noNumber: true,
              city,
              state,
              country,
              addressType,
              CEP,
              location: {
                latitude,
                longitude,
              },
            }),
          );
          setModalVisible(true);
        }
      }
    },
    [dispatch, getAddress, handleShowError, navigation],
  );

  return (
    <Container>
      <GooglePlacesAutocomplete
        autoFillOnNotFound
        ref={googlePlacesAutocompleteRef}
        placeholder="Endereço e número"
        fetchDetails
        listViewDisplayed="auto"
        renderLeftButton={() => (
          <BackButton onPress={() => handleGoBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#78308C" />
          </BackButton>
        )}
        onPress={handleOnPress}
        query={{
          key: 'AIzaSyCtEkNUnkbFXMlhhamVOPgPZGm_0PtpEFw',
          language: 'pt',
          location: '-7.060714, -35.763305',
          radius: '50000',
          strictbounds: true,
        }}
        styles={{
          textInput: {
            color: '#363433',
            fontFamily: 'RobotoSlab-Regular',
          },
        }}
      />
      {loading && (
        <ActivityIndicator
          size={50}
          color="#78308c"
          style={{ flex: 1, alignSelf: 'center' }}
        />
      )}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setNumber('');
        }}
      >
        <ModalContainer>
          <ModalContent
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <ModalTitle>Preencha o número do endereço</ModalTitle>
            <AddressMainText>
              {newDeliveryAddress.mainAddress},{number}
            </AddressMainText>
            <AddressSecundaryText>
              {newDeliveryAddress.secondaryText}
            </AddressSecundaryText>
            <NumberTextInput
              maxLength={4}
              placeholder="Número"
              value={number}
              onChangeText={text => setNumber(text)}
              underlineColorAndroid="#7e7e7e"
            />
            <SearchWithNumberButton
              style={{
                elevation: 2,
              }}
              onPress={handleSearchAddressWithNumber}
            >
              <SearchWithNumberButtonText
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Buscar com número
              </SearchWithNumberButtonText>
            </SearchWithNumberButton>
            <AddressWithoutNumberButton
              style={{
                elevation: 2,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                setNumber('');
                googlePlacesAutocompleteRef.current?.setAddressText('');
                navigation.navigate('RegisterAddress');
              }}
            >
              <AddressWithoutNumberButtonText>
                Endereço sem número
              </AddressWithoutNumberButtonText>
            </AddressWithoutNumberButton>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default SearchAddress;
