import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const BackButtonContainer = styled.View`
  z-index: 2;
  position: absolute;
  top: ${StatusBar.currentHeight}px;
  background-color: transparent;
`;

export const BackButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 10px;
`;

export const FixedTopView = styled.View`
  z-index: 1;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100px;
`;

export const LinearGradientView = styled(LinearGradient)`
  width: 100%;
  height: 80px;
`;

export const RegisterAddressContainer = styled.View`
  flex: 1;
  padding: 12px 16px;
`;

export const AddressContainer = styled.View`
  align-self: flex-start;
`;

export const MainAddressText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #303030;
  font-size: 18px;
  margin-bottom: 4px;
`;
export const AddressText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #7e7e7e;
  font-size: 14px;
`;
export const SecondaryAddressText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #7e7e7e;
  font-size: 12px;
`;

export const ComplementContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TextInputContainer = styled.View``;
export const Label = styled.Text`
  color: #7e7e7e;
  padding: 0;
`;
