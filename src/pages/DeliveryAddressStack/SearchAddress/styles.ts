import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('screen').width;

export const Container = styled.View`
  flex: 1;
`;

export const BackButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  background-color: #ffffff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
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

export const AddressContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const AddressInfoContainer = styled.View`
  margin-left: 10px;
  margin-right: 10px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-top: 22px;
`;

export const ModalContent = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const ModalTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #363433;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;
export const AddressMainText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #363433;
  font-size: 14px;
  text-align: center;
`;
export const AddressSecundaryText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #7e7e7e;
  font-size: 14px;
  text-align: center;
`;

export const NumberTextInput = styled.TextInput`
  align-self: center;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #363433;
  font-family: 'RobotoSlab-Regular';
  width: 70px;
`;

export const SearchWithNumberButton = styled.TouchableOpacity`
  background-color: #78308c;
  border-radius: 5px;
  padding: 10px;
`;
export const SearchWithNumberButtonText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-weight: bold;
`;
export const AddressWithoutNumberButton = styled.TouchableOpacity`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
export const AddressWithoutNumberButtonText = styled.Text`
  margin-top: 10px;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
  font-weight: bold;
  color: #78308c;
`;
