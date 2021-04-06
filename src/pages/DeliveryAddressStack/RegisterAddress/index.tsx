import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { Dimensions, StatusBar, Image, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation, CommonActions } from '@react-navigation/native';

import * as Yup from 'yup';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useAuth } from '~/hooks/auth';
import { Creators as deliveryAddressActions } from '~/store/ducks/deliveryAddress/actions';
import { ApplicationState } from '~/store';
import { DeliveryAddressState } from '~/store/ducks/deliveryAddress/types';
import PurpleMarker from '~/assets/purpleMarker.png';
import getValidationErrors from '~/utils/getValidationErrors';

import {
  Container,
  BackButtonContainer,
  FixedTopView,
  BackButton,
  LinearGradientView,
  RegisterAddressContainer,
  AddressContainer,
  MainAddressText,
  AddressText,
  SecondaryAddressText,
  ComplementContainer,
} from './styles';
import Button from '~/components/Button';
import UnderlineInput from '~/components/UnderlineInput';

const { width, height } = Dimensions.get('window');

interface AddressFormData {
  number: string;
  complement: string;
  referencePoint: string;
}

const RegisterAddress: React.FC = () => {
  const [streetNumber, setStreetNumber] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useAuth();

  const { newDeliveryAddress } = useSelector<
    ApplicationState,
    DeliveryAddressState
  >(state => state.deliveryAddress);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (newDeliveryAddress && newDeliveryAddress.streetNumber)
      setStreetNumber(newDeliveryAddress.streetNumber);
  }, [newDeliveryAddress]);

  const handleRegisterAddress = useCallback(
    async (data: AddressFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          number: Yup.string().required('Campo obrigatório'),
          referencePoint: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(
          deliveryAddressActions.createDeliveryAddress({
            ...newDeliveryAddress,
            streetNumber: data.number,
            referencePoint: data.referencePoint,
            userId: user?.id,
          }),
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Home' }],
          }),
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [dispatch, navigation, newDeliveryAddress, user],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangeNumber = useCallback(value => {
    setStreetNumber(value);
  }, []);

  return (
    <Container>
      <BackButtonContainer>
        <BackButton onPress={() => handleGoBack()}>
          <FeatherIcon name="chevron-left" size={32} color="#78308C" />
        </BackButton>
      </BackButtonContainer>

      <FixedTopView>
        <LinearGradientView colors={['#F6F2F8', 'transparent']} />
      </FixedTopView>
      <MapView
        zoomEnabled={false}
        scrollEnabled={false}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: newDeliveryAddress?.location.latitude,
          longitude: newDeliveryAddress?.location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        style={{
          alignSelf: 'flex-start',
          width,
          height: height / 4,
          marginTop: isKeyboardVisible ? '-20%' : StatusBar.currentHeight,
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
      <Form style={{ flex: 1 }} ref={formRef} onSubmit={handleRegisterAddress}>
        <RegisterAddressContainer>
          <AddressContainer>
            {newDeliveryAddress.addressType === 'place' ? (
              <>
                <MainAddressText>
                  {newDeliveryAddress.mainAddress}
                </MainAddressText>
                <AddressText>
                  {newDeliveryAddress.streetName}, {streetNumber}
                </AddressText>
              </>
            ) : (
              <MainAddressText>
                {newDeliveryAddress.streetName}, {streetNumber}
              </MainAddressText>
            )}
            <SecondaryAddressText>
              {newDeliveryAddress.secondaryText}
            </SecondaryAddressText>
          </AddressContainer>
          <ComplementContainer>
            <UnderlineInput
              autoCorrect={false}
              name="number"
              label="Número"
              defaultValue={newDeliveryAddress.streetNumber}
              containerStyle={{ width: '20%' }}
              onChangeText={handleChangeNumber}
            />
            <UnderlineInput
              autoCorrect={false}
              name="complement"
              label="Complemento"
              containerStyle={{ width: '60%' }}
              helperText="Apto / Bloco / Casa"
            />
          </ComplementContainer>
          <UnderlineInput
            autoCorrect={false}
            name="referencePoint"
            label="Ponto de referência"
            containerStyle={{
              width: '100%',
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Salvar endereço
          </Button>
        </RegisterAddressContainer>
      </Form>
    </Container>
  );
};

export default RegisterAddress;
