import React, { ReactNode } from 'react';
import { Form } from '@unform/mobile';
import { RouteProp } from '@react-navigation/native';
import { Container, Title, EmailText } from './styles';

type EmailCodeValidationParams = {
  EmailCodeValidation: { email: string };
};

type EmailCodeValidationScreenRouteProp = RouteProp<
  EmailCodeValidationParams,
  'EmailCodeValidation'
>;

type Props = {
  route: EmailCodeValidationScreenRouteProp;
};

const EmailCodeValidation: React.FC<Props> = ({ route }) => {
  const { email } = route.params;
  return (
    <Container>
      <Title>Insira o código enviado para</Title>
      <EmailText> {email} </EmailText>
    </Container>
  );
};

export default EmailCodeValidation;
