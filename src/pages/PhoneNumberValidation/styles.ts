import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: #000000;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 6px;
`;

export const PhoneText = styled.Text`
  font-size: 20px;
  color: #78308c;
  font-family: 'RobotoSlab-Medium';
  margin: 0px 0 12px;
`;
