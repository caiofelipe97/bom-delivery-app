import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface SelectedProps {
  selected?: boolean;
}

export const Container = styled.TouchableOpacity<SelectedProps>`
  padding: 12px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  margin-bottom: 6px;
  margin-top: 6px;
  border-radius: 10px;
  border: ${props =>
    props.selected ? '2px solid rgba(120,48, 140, 0.75)' : 0};
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

export const AddressText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #3e4462;
  font-size: 16px;
`;
export const RegionText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #7e7e7e;
  font-size: 12px;
`;
export const ComplementText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #7e7e7e;
  font-size: 10px;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: #78308c;
  position: absolute;
  right: 12px;
  top: 12px;
`;
