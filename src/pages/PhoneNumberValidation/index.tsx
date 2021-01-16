import React, { useCallback, useRef } from 'react';
import { TextInput, Keyboard, Alert } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import { Container, Title, PhoneText } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

import SquareInput from '../../components/SquareInput';
import Button from '../../components/Button';
import api from '../../services/api';

interface RouteParams {
  email: string;
  phoneNumber: string;
}

interface PhoneCodeFormData {
  first: string;
  second: string;
  third: string;
  fourth: string;
}

interface Response {
  token: string | null;
}

const PhoneNumberValidation: React.FC = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const formRef = useRef<FormHandles>(null);
  const secondInputRef = useRef<TextInput>(null);
  const thirdInputRef = useRef<TextInput>(null);
  const fourthInputRef = useRef<TextInput>(null);

  const { email, phoneNumber } = params as RouteParams;

  const handleCodeValidation = useCallback(
    async (data: PhoneCodeFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          first: Yup.string().required(),
          second: Yup.string().required(),
          third: Yup.string().required(),
          fourth: Yup.string().required(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { first, second, third, fourth } = data;
        const code = `${first}${second}${third}${fourth}`;

        // Remove non numeric characters
        const phoneNumberRawValue = phoneNumber.replace(/\D/g, '');

        await api.post<Response>('phone-confirmations/validate', {
          phoneNumber: phoneNumberRawValue,
          code: Number(code),
        });

        navigation.navigate('SignUp', { email, phoneNumber });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        if (err.response) {
          Alert.alert(
            'Erro na validação do número de celular',
            err.response.data?.message,
          );
        } else {
          Alert.alert(
            'Erro na validação do número de celular',
            'Tente novamente',
          );
        }
      }
    },
    [email, navigation, phoneNumber],
  );

  return (
    <Container>
      <Title>Insira o código enviado para</Title>
      <PhoneText> {phoneNumber} </PhoneText>
      <Form
        ref={formRef}
        onSubmit={handleCodeValidation}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <SquareInput
          name="first"
          containerStyle={{ margin: 10 }}
          returnKeyType="next"
          onChange={e => {
            const { text } = e.nativeEvent;
            if (text.length > 0) secondInputRef.current?.focus();
          }}
          onSubmitEditing={() => {
            secondInputRef.current?.focus();
          }}
        />
        <SquareInput
          ref={secondInputRef}
          name="second"
          containerStyle={{ margin: 10 }}
          returnKeyType="next"
          onChange={e => {
            const { text } = e.nativeEvent;
            if (text.length > 0) thirdInputRef.current?.focus();
          }}
          onSubmitEditing={() => {
            thirdInputRef.current?.focus();
          }}
        />
        <SquareInput
          ref={thirdInputRef}
          name="third"
          containerStyle={{ margin: 10 }}
          returnKeyType="next"
          onChange={e => {
            const { text } = e.nativeEvent;
            if (text.length > 0) fourthInputRef.current?.focus();
          }}
          onSubmitEditing={() => {
            fourthInputRef.current?.focus();
          }}
        />
        <SquareInput
          ref={fourthInputRef}
          name="fourth"
          containerStyle={{ margin: 10 }}
          returnKeyType="send"
          onChange={e => {
            const { text } = e.nativeEvent;
            if (text.length > 0) Keyboard.dismiss();
          }}
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
      </Form>
      <Button
        onPress={() => {
          formRef.current?.submitForm();
        }}
      >
        Confirmar
      </Button>
    </Container>
  );
};

export default PhoneNumberValidation;
