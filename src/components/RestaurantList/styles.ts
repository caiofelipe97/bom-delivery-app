import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native';
import { Restaurant } from '~/types';

interface TextDescriptionProps {
  color: string;
  size: string;
  bold?: boolean;
}

export const RestaurantListContainer = styled.View`
  width: 100%;
`;

export const RestaurantListItem = styled.View`
  background-color: #ffffff;
  margin-bottom: 8px;
  flex-direction: row;
  border-radius: 5px;
`;

export const LogoContainer = styled.View`
  padding: 16px 8px 16px 16px;
`;

export const Logo = styled.Image`
  width: 60px;
  height: 60px;
`;

export const Infos = styled.View`
  padding: 4px 4px;
  justify-content: center;
`;

export const RestaurantDetails = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DeliveryDetails = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Separator = styled.Text`
  color: #999;
  margin: 0 4px;
`;

export const TextDescription = styled.Text<TextDescriptionProps>`
  ${props =>
    css`
      font-size: ${props.size}px;
      color: ${props.color};
    `}
  ${props =>
    props.bold &&
    css`
      font-weight: bold;
    `}
  font-family: 'RobotoSlab-Medium';
`;

export const StarIcon = styled(FontAwesomeIcon)`
  color: #daa520;
  margin-right: 4px;
`;

export const ClockIcon = styled(FeatherIcon)`
  color: #999;
  margin-right: 4px;
`;
