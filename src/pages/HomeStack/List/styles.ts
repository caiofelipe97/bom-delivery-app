import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 12px ${Platform.OS === 'android' ? 80 : 40}px;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const EmptyListText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;
export const ClearFiltersButton = styled.TouchableOpacity`
  margin-top: 10px;
`;
export const ClearFiltersText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #78308c;
`;
