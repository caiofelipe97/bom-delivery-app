import React, { useCallback, useRef } from 'react';
import { Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  InfoText,
  BackButton,
  BackButtonText,
} from './styles';

interface EmailConfirmationProps {
  email: string;
}

const EmailConfirmation: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleEmailConfirmation = useCallback(
    async (data: EmailConfirmationProps) => {
      try {
        formRef.current?.setErrors({});
        console.log(data);
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('email-confirmations', data);
        navigation.navigate('EmailCodeValidation', { email: data.email });
        /*
        Alert.alert(
          'E-mail verificado!',
          'Você já pode fazer o login na aplicação!',
        );
        */
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert(
          'Erro na verificacão do e-mail',
          'Ocorreu um erro na verificacão do e-mail, tente novamente.',
        );
      }
    },
    [],
  );

  return (
    <Container>
      <Title>Insira seu e-mail</Title>
      <Form ref={formRef} onSubmit={handleEmailConfirmation}>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          name="email"
          icon="mail"
          placeholder="E-mail"
          returnKeyType="next"
          onSubmitEditing={() => {
            formRef.current?.submitForm();
          }}
        />
      </Form>
      <InfoText>
        Toque em avançar para receber o link de confirmação por e-mail.
      </InfoText>
      <Button
        onPress={() => {
          Keyboard.dismiss();
          formRef.current?.submitForm();
        }}
      >
        Avançar
      </Button>
      <BackButton>
        <Icon name="arrow-left" size={20} color="#78308c" />

        <BackButtonText>Entrar de outra forma</BackButtonText>
      </BackButton>
    </Container>
  );
};

export default EmailConfirmation;
