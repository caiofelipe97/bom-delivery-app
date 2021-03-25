import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
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
  z-index: 2;
  position: absolute;
  top: ${StatusBar.currentHeight}px;
  width: 100%;
  height: 100px;
  align-items: center;
`;

export const LinearGradientView = styled.View`
  z-index: 1;
  position: absolute;
  top: 0;
  width: 100%;
  height: 200px;
`;

export const LinearGradientContainer = styled(LinearGradient)`
  width: 100%;
  height: 200px;
`;

export const MainAddressText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: rgba(48, 48, 48, 0.8);
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;
export const SecondaryAddressText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #7e7e7e;
  font-size: 14px;
  text-align: center;
`;

export const FixedBottomView = styled.View`
  z-index: 1;
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 10px 20px;
`;
