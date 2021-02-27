import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Promotion } from '~/types';

export const PromoSliderList = styled(
  FlatList as new () => FlatList<Promotion>,
).attrs({
  contentContainerStyle: { paddingLeft: 8, paddingRight: 8 },
  showsHorizontalScrollIndicator: false,
  bounces: false,
  horizontal: true,
})`
  padding-bottom: 12px;
`;

export const BannerImage = styled.Image`
  width: 300px;
  height: 160px;
  border-radius: 4px;
`;
