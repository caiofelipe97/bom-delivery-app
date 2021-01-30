import React, { useEffect, useCallback } from 'react';
import { Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';

import {
  Container,
  Background,
  Content,
  FacebookButton,
  FacebookButtonText,
  TermsButton,
  TermsText,
} from './styles';

import logoImg from '../../../assets/logo.png';
import Button from '../../../components/Button';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { fbLogin, user, facebookUser } = useAuth();

  useEffect(() => {
    if (!user && facebookUser) {
      navigation.navigate('PhoneNumberConfirmation', {
        email: facebookUser.email,
      });
    }
  }, [user, facebookUser, navigation]);

  const handleLoginWithFacebook = useCallback(() => {
    if (facebookUser) {
      navigation.navigate('PhoneNumberConfirmation', {
        email: facebookUser.email,
      });
    } else {
      fbLogin();
    }
  }, [facebookUser, fbLogin, navigation]);

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
          <FacebookButton onPress={handleLoginWithFacebook}>
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
