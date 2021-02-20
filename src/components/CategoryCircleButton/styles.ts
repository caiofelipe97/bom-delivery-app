import styled, { css } from 'styled-components/native';

interface SelectedProps {
  isSelected: boolean;
}

export const Container = styled.View`
  justify-content: space-between;
  width: 75px;
`;

export const Content = styled.TouchableOpacity<SelectedProps>`
  width: 75px;
  height: 75px;
  border-radius: 50px;
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
  height: 40px;
  flex-wrap: wrap;
  text-align: center;
  color: rgba(0, 0, 0, 0.54);
  ${props =>
    props.isSelected &&
    css`
      color: #78308c;
    `}
`;
