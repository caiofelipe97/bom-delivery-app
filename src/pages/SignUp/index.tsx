import React, { useCallback, useEffect, useRef } from 'react';
import { Alert, Image, StatusBar, TextInput } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import { Container, Background, Content, Title } from './styles';

import { useAuth } from '../../hooks/auth';
import nameImg from '../../assets/name.png';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { User } from '../../types';

interface RouteParams {
  email: string;
  phoneNumber: string;
}

interface SignUpFormData {
  name: string;
  secondName: string;
  birthDate: string;
}

interface Response {
  token: string;
  user: User;
}

const SignUp: React.FC = () => {
  const { params } = useRoute();
  const { signInWithCustomToken } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const secondNameInputRef = useRef<TextInput>(null);
  const birthDateInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      const { email, phoneNumber } = params as RouteParams;

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .min(2, 'O nome deve ter no mínimo 2 caracteres.')
          .required('Nome é obrigatório'),
        secondName: Yup.string()
          .min(2, 'O sobrenome deve ter no mínimo 2 caracteres.')
          .required('Sobrenome é obrigatório'),
        birthDate: Yup.string()
          .length(10, 'A data de aniverário é inválida')
          .required('Data de aniversário é obrigatória'),
      });

      const dateParts = data.birthDate.split('/');
      const birthDateEdited = new Date(
        parseInt(dateParts[2], 10),
        parseInt(dateParts[1], 10) - 1,
        parseInt(dateParts[0], 10),
        12,
      );

      await schema.validate(data, {
        abortEarly: false,
      });

      const fullName = `${data.name} ${data.secondName}`;

      const response = await api.post<Response>('users', {
        name: fullName,
        birthDate: birthDateEdited,
        email,
        phoneNumber,
      });
      console.log(response.data);

      const { token, user } = response.data;
      await signInWithCustomToken({ token });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      if (err.response) {
        Alert.alert('Erro no cadastro do usuário', err.response.data?.message);
      } else {
        Alert.alert('Erro no cadastro do usuário', 'Tente novamente');
      }
    }
  }, []);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#78308C"
      />
      <Container>
        <Background>
          <Image source={nameImg} />
        </Background>
        <Content>
          <Title>Crie sua conta</Title>
          <Form
            ref={formRef}
            onSubmit={handleSignUp}
            style={{ flex: 1, width: '100%' }}
          >
            <Input
              autoCapitalize="words"
              containerStyle={{ marginBottom: 12 }}
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                secondNameInputRef.current?.focus();
              }}
            />
            <Input
              ref={secondNameInputRef}
              containerStyle={{ marginBottom: 12 }}
              autoCapitalize="words"
              name="secondName"
              icon="users"
              placeholder="Sobrenome"
              returnKeyType="next"
              onSubmitEditing={() => {
                birthDateInputRef.current?.focus();
              }}
            />
            <InputMask
              ref={birthDateInputRef}
              containerStyle={{ marginBottom: 12 }}
              type="datetime"
              options={{
                format: 'DD/MM/YYYY',
              }}
              name="birthDate"
              icon="gift"
              placeholder="Data de nascimento"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Input
              name="email"
              containerStyle={{ marginBottom: 12 }}
              icon="mail"
              value="caiofelipee17@gmail.com"
              editable={false}
              selectTextOnFocus={false}
            />
            <Input
              name="phoneNumber"
              containerStyle={{ marginBottom: 12 }}
              icon="phone"
              value="83999799173"
              editable={false}
              selectTextOnFocus={false}
            />
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Cadastrar
            </Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
