import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 0 12px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const SectionContainer = styled.View`
  margin-bottom: 8px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 0 0;
`;

export const CircleButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
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
