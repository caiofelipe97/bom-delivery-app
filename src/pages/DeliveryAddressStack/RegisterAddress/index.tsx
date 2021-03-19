import React, { useEffect, useState } from 'react';
import { Text, Dimensions, StatusBar, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import { ApplicationState } from '~/store';
import { DeliveryAddressState } from '~/store/ducks/deliveryAddress/types';
import PurpleMarker from '~/assets/purpleMarker.png';

import {
  Container,
  FixedTopView,
  LinearGradientView,
  RegisterAddressContainer,
  AddressContainer,
  MainAddressText,
  AddressText,
  SecondaryAddressText,
  ComplementContainer,
  TextInputContainer,
  Label,
} from './styles';
import Button from '~/components/Button';

const { width, height } = Dimensions.get('window');

const RegisterAddress: React.FC = () => {
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [referencePoint, setReferencePoint] = useState('');

  const { newDeliveryAddress } = useSelector<
    ApplicationState,
    DeliveryAddressState
  >(state => state.deliveryAddress);

  useEffect(() => {
    if (newDeliveryAddress.streetNumber)
      setNumber(newDeliveryAddress.streetNumber);
  }, [newDeliveryAddress.streetNumber]);

  return (
    <Container>
      <FixedTopView>
        <LinearGradientView colors={['#F6F2F8', 'transparent']} />
      </FixedTopView>
      <MapView
        zoomEnabled={false}
        scrollEnabled={false}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: newDeliveryAddress.location.latitude,
          longitude: newDeliveryAddress.location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
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
            latitude: newDeliveryAddress.location.latitude || -7.060714,
            longitude: newDeliveryAddress.location.longitude || -35.763305,
          }}
        >
          <Image source={PurpleMarker} style={{ width: 40, height: 40 }} />
        </Marker>
      </MapView>
      <RegisterAddressContainer>
        <AddressContainer>
          <MainAddressText>{newDeliveryAddress.mainAddress}</MainAddressText>
          {newDeliveryAddress.addressType === 'place' && (
            <AddressText>
              {newDeliveryAddress.streetName}, {number}
            </AddressText>
          )}
          <SecondaryAddressText>
            {newDeliveryAddress.secondaryText}
          </SecondaryAddressText>
        </AddressContainer>

        <ComplementContainer>
          <TextInputContainer>
            <Label>Número</Label>
            <TextInput
              placeholder="Número"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#adadad',
                paddingBottom: 0,
              }}
            />
          </TextInputContainer>
          <TextInputContainer>
            <Label>Complemento</Label>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#adadad',
                paddingBottom: 0,
              }}
            />
          </TextInputContainer>
        </ComplementContainer>
        <TextInputContainer>
          <Label>Ponto de referência</Label>
          <TextInput
            value={referencePoint}
            onChangeText={text => setReferencePoint(text)}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#adadad',
              paddingBottom: 0,
            }}
          />
        </TextInputContainer>

        <Button>Salvar endereço</Button>
      </RegisterAddressContainer>
    </Container>
  );
};

export default RegisterAddress;
