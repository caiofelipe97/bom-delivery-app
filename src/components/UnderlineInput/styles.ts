import styled, { css } from 'styled-components/native';

interface UnderlineInputProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View``;

export const Content = styled.View<UnderlineInputProps>`
  height: 50px;

  border-bottom-width: 1px;
  border-bottom-color: #adadad;
  ${props =>
    props.isErrored &&
    css`
      border-bottom-width: 2px;

      border-bottom-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-bottom-width: 2px;

      border-bottom-color: #78308c;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  padding-top: 0px;
  padding-bottom: 0px;
`;

export const Label = styled.Text<UnderlineInputProps>`
  color: #7e7e7e;
  font-family: 'RobotoSlab-Regular';

  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
      font-family: 'RobotoSlab-Medium';
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #78308c;
      font-family: 'RobotoSlab-Medium';
    `}
    padding: 0;
`;

export const HelperText = styled.Text<UnderlineInputProps>`
  color: #7e7e7e;
  font-family: 'RobotoSlab-Regular';
  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #78308c;
    `}
`;
