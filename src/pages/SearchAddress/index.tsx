import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import FeatherIcon from 'react-native-vector-icons/Feather';

import { Container, BackButton } from './styles';

const SearchAddress: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <GooglePlacesAutocomplete
        placeholder="Endereço e número"
        fetchDetails
        renderLeftButton={() => (
          <BackButton onPress={() => handleGoBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#78308C" />
          </BackButton>
        )}
        onPress={(data, details = null) => {
          console.log('react-native-google-places-autocomplete');
          // 'details' is provided when fetchDetails = true
          console.log('data');
          console.log(data);
          console.log('details');
          console.log(details);
        }}
        query={{
          key: 'AIzaSyCtEkNUnkbFXMlhhamVOPgPZGm_0PtpEFw',
          language: 'pt',
          location: '-7.060714, -35.763305',
          radius: '15000',
          strictbounds: true,
        }}
        styles={{
          textInput: {
            color: '#363433',
            fontFamily: 'RobotoSlab-Regular',
          },
        }}
      />
    </Container>
  );
};

export default SearchAddress;
