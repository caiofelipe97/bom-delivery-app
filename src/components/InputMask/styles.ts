import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TextInputMask } from 'react-native-masked-text';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-color: #ffffff;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #78308c;
    `}
`;

export const TextInput = styled(TextInputMask)`
  flex: 1;
  color: #363433;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
