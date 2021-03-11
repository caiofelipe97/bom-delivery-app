import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: ${StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 32}px 12px
    ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const BackButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  background-color: #ffffff;
  padding-left: 5px;
  padding-right: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;
