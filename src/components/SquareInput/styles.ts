import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
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

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #363433;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
`;
