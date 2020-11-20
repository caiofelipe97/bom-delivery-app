import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 20%;
  align-items: center;
  justify-content: center;
  background: #78308c;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.06);
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
`;

export const Content = styled.View`
  bottom: ${Platform.OS === 'android' ? 64 : 32}px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #78308c;
  font-family: 'RobotoSlab-Medium';
  margin: 12px 0 24px;
`;
