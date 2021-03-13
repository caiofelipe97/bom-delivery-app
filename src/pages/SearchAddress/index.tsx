import React, { useCallback, useState, useRef } from 'react';
import { Modal } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { useNavigation } from '@react-navigation/native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { UserAddress } from '~/types/index';

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
  const [newAddress, setNewAddress] = useState({} as UserAddress);
  const [number, setNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

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

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearchAddressWithNumber = useCallback(async () => {
    Geocoder.init('AIzaSyCtEkNUnkbFXMlhhamVOPgPZGm_0PtpEFw');

    const searchAddress = `${newAddress.main_text}, ${number} - ${newAddress.secondary_text}`;
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

        const main_text = `${streetName}, ${streetNumber}`;
        const secondary_text = `${district ? `${district}, ` : ''}${
          city ? `${city} - ` : ''
        }${state ? `${state}, ` : ''}${country ? `${country}` : ''}
        `;
        setNumber('');
        setLoading(false);
        googlePlacesAutocompleteRef.current?.setAddressText('');
        navigation.navigate('RegisterAddress', {
          streetName,
          streetNumber,
          district,
          city,
          state,
          country,
          CEP,
          main_text,
          secondary_text,
          location: {
            latitude,
            longitude,
          },
        });
      }
    } catch (err) {
      setNumber('');
      setLoading(false);
      googlePlacesAutocompleteRef.current?.setAddressText('');
      console.log(err);
      navigation.navigate('RegisterAddress', {
        ...newAddress,
        streetNumber: number,
      });
    }
  }, [getAddress, modalVisible, navigation, newAddress, number]);

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
        onPress={(data, details = null) => {
          const { main_text, secondary_text } = data.structured_formatting;
          const location = details?.geometry.location;
          const address_components = details?.address_components;
          if (
            !address_components ||
            !location ||
            !location.lat ||
            !location.lng
          ) {
            setError(true);
          } else {
            setError(false);
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
            if (streetNumber) {
              googlePlacesAutocompleteRef.current?.setAddressText('');
              navigation.navigate('RegisterAddress', {
                streetName,
                streetNumber,
                district,
                city,
                state,
                country,
                CEP,
                main_text,
                secondary_text,
                location: {
                  latitude,
                  longitude,
                },
              });
            } else {
              setNewAddress({
                streetName,
                district,
                city,
                state,
                country,
                main_text,
                secondary_text,
                location: {
                  latitude,
                  longitude,
                },
              });
              setModalVisible(true);
            }
          }
        }}
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
            <AddressMainText>{newAddress.main_text},</AddressMainText>
            <AddressSecundaryText>
              {newAddress.secondary_text}
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
                navigation.navigate('RegisterAddress', newAddress);
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
