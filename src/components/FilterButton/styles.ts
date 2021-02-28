import styled, { css } from 'styled-components/native';

interface FilterProps {
  hasFilter: boolean;
}

export const FilterButtonContainer = styled.TouchableOpacity<FilterProps>`
  display: flex;
  border-radius: 30px;
  height: 36px;
  background-color: rgba(120, 48, 140, 0.08);
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 0px 12px;
  ${props =>
    props.hasFilter &&
    css`
      border: 0px;
      background-color: rgba(120, 48, 140, 0.25);
    `}
`;

export const FilterNumberContainer = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: #78308c;
  align-items: center;
  justify-content: center;
`;
export const FilterNumberText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
  color: #ffffff;
  text-align: center;
`;

export const FilterText = styled.Text<FilterProps>`
  color: #7e7e7e;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-right: 4px;
  ${props =>
    props.hasFilter &&
    css`
      color: #78308c;
    `}
`;

export const FilterImage = styled.Image``;
