import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0 12px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const DeliveryAddressesContainer = styled.View``;
