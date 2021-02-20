import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 10px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const SectionContainer = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 0;
`;

export const ShowResultsContainer = styled.View`
  position: absolute;
  background-color: #fff;
  bottom: 15px;
  right: 0;
  left: 0;
  padding: 0 10px;
`;

export const ShowResultsButton = styled(Button)`
  position: relative;
`;
