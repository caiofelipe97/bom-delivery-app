import React from 'react';
import { StatusBar, Image } from 'react-native';
import { Container, Background, Content, Title } from './styles';
import nameImg from '../../assets/name.png';

const SignUp: React.FC = () => {
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
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
