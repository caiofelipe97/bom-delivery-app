import React, { useCallback } from 'react';
import { Form } from '@unform/mobile';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Title, EmailText, TextInput } from './styles';
import SquareInput from '../../components/SquareInput';
import Button from '../../components/Button';

interface RouteParams {
  email: string;
}

const EmailCodeValidation: React.FC<Props> = ({ route }) => {
  const { params } = useRoute();

  const { email } = params as RouteParams;

  const handleCodeValidation = useCallback(() => {}, []);

  return (
    <Container>
      <Title>Insira o código enviado para</Title>
      <EmailText> {email} </EmailText>
      <Form
        onSubmit={handleCodeValidation}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <SquareInput name="first" containerStyle={{ margin: 10 }} />
        <SquareInput name="second" containerStyle={{ margin: 10 }} />
        <SquareInput name="third" containerStyle={{ margin: 10 }} />
        <SquareInput name="fourth" containerStyle={{ margin: 10 }} />
      </Form>
      <Button onPress={() => {}}>Confirmar</Button>
    </Container>
  );
};

export default EmailCodeValidation;
