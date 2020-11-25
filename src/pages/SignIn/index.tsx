import React from 'react';
import { Image, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Background,
  Content,
  FacebookButton,
  FacebookButtonText,
  TermsButton,
  TermsText,
} from './styles';

import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  console.log('SignIn!');
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#78308C"
      />
      <Container>
        <Background>
          <Image source={logoImg} />
        </Background>
        <Content>
          <FacebookButton
            onPress={() => {
              console.log('Login Facebbok');
            }}
          >
            <FacebookButtonText>ENTRAR COM FACEBOOK</FacebookButtonText>
          </FacebookButton>
          <Button
            style={{ marginTop: 32 }}
            onPress={() => navigation.navigate('EmailConfirmation')}
          >
            ENTRAR COM E-MAIL
          </Button>
        </Content>
        <TermsButton
          onPress={() => {
            console.log('Ir para termos');
          }}
        >
          <TermsText>
            Ao entrar, você concorda com nossos Termos de Uso e Política de
            Dados.
          </TermsText>
        </TermsButton>
      </Container>
    </>
  );
};

export default SignIn;
