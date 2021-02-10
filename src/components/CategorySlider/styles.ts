import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Category } from '~/types';

export const CategorySliderList = styled(
  FlatList as new () => FlatList<Category>,
).attrs({
  contentContainerStyle: { paddingLeft: 8, paddingRight: 8 },
  showsHorizontalScrollIndicator: false,
  bounces: false,
  horizontal: true,
})`
  padding-bottom: 12px;
`;

export const CategorySliderItem = styled.View`
  width: 110px;
  overflow: hidden;
  margin-right: 8px;
`;

export const CategorySliderImage = styled.Image`
  border-radius: 4px;
  width: 100%;
  height: 90px;
`;

export const CategorySliderTitle = styled.View`
  padding: 12px 0 0;
  align-items: center;
`;
