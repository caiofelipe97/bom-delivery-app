import React from 'react';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { Container, Title } from './styles';

const Home: React.FC = () => {
  console.log('Home!');
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Title>Bem-Vindo ao Bom Delivery, {user?.name}!</Title>
      <Button onPress={signOut}>Logout</Button>
    </Container>
  );
};

export default Home;
