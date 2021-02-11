import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 12px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
`;

export const SearchButton = styled(RectButton)`
  width: 70%;
  height: 36px;
  background: rgba(120, 48, 140, 0.08);
  border-radius: 34px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0px 16px;
`;

export const SearchText = styled.Text`
  color: #7e7e7e;
  flex: 1;
  line-height: 20px;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const ChevronDownIcon = styled(FeatherIcon)`
  color: #78308c;
`;

export const FilterButton = styled.TouchableOpacity`
  display: flex;
  border-radius: 30px;
  height: 36px;
  background-color: #78308c;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 0px 12px;
`;

export const FilterText = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
  margin-right: 4px;
`;

export const FilterImage = styled.Image``;
