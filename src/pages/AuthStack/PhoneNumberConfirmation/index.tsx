import React, { useCallback, useRef } from 'react';
import { Alert, Keyboard } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../../services/api';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Container, Title, InfoText } from './styles';
import InputMask from '../../../components/InputMask';

interface RouteParams {
  email: string;
}
interface PhoneNumberConfirmationProps {
  phoneNumber: string;
}

const PhoneNumberConfirmation: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const { params } = useRoute();

  const { email } = params as RouteParams;

  const handlePhoneNumberConfirmation = useCallback(
    async (data: PhoneNumberConfirmationProps) => {
      try {
        formRef.current?.setErrors({});
        console.log(data);

        const schema = Yup.object().shape({
          phoneNumber: Yup.string()
            .required('Número de celular obrigatório')
            .length(15, 'O número de celular é inválido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // Remove non numeric characters
        const phoneNumber = data.phoneNumber.replace(/\D/g, '');

        await api.post('phone-confirmations', { phoneNumber });

        navigation.navigate('PhoneNumberValidation', {
          email,
          phoneNumber: data.phoneNumber,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        if (err.response) {
          Alert.alert(
            'Erro na verificacão do número de celular',
            err.response.data?.message,
          );
        } else {
          Alert.alert(
            'Erro na verificacão do número de celular',
            'Tente novamente',
          );
        }
      }
    },
    [],
  );
  return (
    <Container>
      <Title>Insira seu número de celular</Title>
      <Form ref={formRef} onSubmit={handlePhoneNumberConfirmation}>
        <InputMask
          type="cel-phone"
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          keyboardType="number-pad"
          name="phoneNumber"
          icon="phone"
          placeholder="DDD + Celular"
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />
      </Form>
      <InfoText>
        Toque em avançar para receber um código confirmação via SMS.
      </InfoText>
      <Button
        onPress={() => {
          Keyboard.dismiss();
          formRef.current?.submitForm();
        }}
      >
        Avançar
      </Button>
    </Container>
  );
};

export default PhoneNumberConfirmation;
