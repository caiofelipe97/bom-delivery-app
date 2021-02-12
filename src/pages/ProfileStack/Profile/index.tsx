import React from 'react';
import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/auth';
import { Container, Title } from './styles';

const Profile: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Title>{user?.name}</Title>
      <Button onPress={signOut}>Logout</Button>
    </Container>
  );
};

export default Profile;
