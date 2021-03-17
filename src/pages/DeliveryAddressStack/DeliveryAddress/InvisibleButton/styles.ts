import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  padding: 0 12px;
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #c4c4c4;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  margin-left: 12px;
`;

export const ButtonTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #3e4462;
  font-size: 18px;
`;
export const ButtonSubTitle = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #7e7e7e;
  font-size: 12px;
`;
