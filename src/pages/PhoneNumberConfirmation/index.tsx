import React, { useCallback } from 'react';
import { Form } from '@unform/mobile';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, InfoText } from './styles';

const PhoneNumberConfirmation: React.FC = () => {
  const handlePhoneNumberConfirmation = useCallback(() => {
    console.log('PhoneNumberConfirmation');
  }, []);
  return (
    <Container>
      <Title>Insira seu número de celular</Title>
      <Form onSubmit={handlePhoneNumberConfirmation}>
        <Input
          keyboardType="number-pad"
          name="phoneNumber"
          icon="phone"
          placeholder="DDD + Celular"
          returnKeyType="next"
        />
      </Form>
      <InfoText>
        Toque em avançar para receber um código confirmação via SMS.
      </InfoText>
      <Button onPress={() => {}}>Avançar</Button>
    </Container>
  );
};

export default PhoneNumberConfirmation;
