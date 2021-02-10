import React from 'react';
import { View } from 'react-native';
import { Promotion } from '~/types';
import { PromoSliderList, BannerImage } from './styles';

interface PromoSliderListProps {
  data: Promotion[];
}

const PromoSlider: React.FC<PromoSliderListProps> = ({ data }) => {
  return (
    <PromoSliderList
      data={data}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <BannerImage source={{ uri: item.bannerUrl }} />
      )}
    />
  );
};

export default PromoSlider;
