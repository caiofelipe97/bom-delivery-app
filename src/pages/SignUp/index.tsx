import React, { useCallback, useEffect, useRef } from 'react';
import { Image, StatusBar, TextInput } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { Container, Background, Content, Title } from './styles';
import nameImg from '../../assets/name.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface RouteParams {
  email: string;
  phoneNumber: string;
}

const SignUp: React.FC = () => {
  const { params } = useRoute();

  const formRef = useRef<FormHandles>(null);
  const secondNameInputRef = useRef<TextInput>(null);
  const birthdayInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async () => {
    console.log('signUp');
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
                birthdayInputRef.current?.focus();
              }}
            />
            <Input
              ref={secondNameInputRef}
              containerStyle={{ marginBottom: 12 }}
              name="birthday"
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
