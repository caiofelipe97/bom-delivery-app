import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0px 12px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const DeliveryAddressesContainer = styled.View``;
