import styled, { css } from 'styled-components/native';

interface SelectedProps {
  isSelected: boolean;
}

export const Container = styled.TouchableOpacity<SelectedProps>`
  margin-right: 8px;
  border-radius: 34px;
  padding: 8px 12px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  margin-top: 8px;
  justify-content: center;
  align-items: center;

  ${props =>
    props.isSelected &&
    css`
      border-color: #78308c;
      background-color: rgba(120, 48, 140, 0.25);
    `}
`;

export const Title = styled.Text<SelectedProps>`
  text-align: center;
  color: #7e7e7e;
  font-size: 16px;
  ${props =>
    props.isSelected &&
    css`
      color: #78308c;
    `}
`;
