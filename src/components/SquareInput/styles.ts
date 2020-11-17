import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 56px;
  height: 56px;
  padding: 0 16px;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-color: #78308c;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #363433;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
