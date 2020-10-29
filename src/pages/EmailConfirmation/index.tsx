import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title,
  InfoText,
  BackButton,
  BackButtonText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const EmailConfirmation: React.FC = () => {
  return (
    <Container>
      <Title>Insira seu e-mail</Title>
      <Input name="email" icon="mail" placeholder="E-mail" />
      <InfoText>
        Toque em avançar para receber o link de confirmação por e-mail.
      </InfoText>
      <Button>Avançar</Button>
      <BackButton>
        <Icon name="arrow-left" size={20} color="#78308c" />

        <BackButtonText>Entrar de outra forma</BackButtonText>
      </BackButton>
    </Container>
  );
};

export default EmailConfirmation;
