import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.View`
  width: 100%;
  height: 60%;
  align-items: center;
  justify-content: center;
  background: #78308c;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.06);
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
`;

export const Content = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const FacebookButton = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #4267b2;
  border-radius: 10px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;

export const FacebookButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f6f6f9;
  font-size: 18px;
`;

export const TermsButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-color: #232129;
  padding: 16px 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TermsText = styled.Text`
  color: #888888;
  font-family: 'RobotoSlab-Regular';
  font-size: 17px;
  text-align: center;
`;
