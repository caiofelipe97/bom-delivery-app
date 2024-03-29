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
  color: #78308c;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;
export const InfoText = styled.Text`
  margin-top: 20px;
  color: #888888;
  font-family: 'RobotoSlab-Regular';
  font-size: 17px;
  text-align: center;
`;
export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 16px 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const BackButtonText = styled.Text`
  color: #78308c;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
