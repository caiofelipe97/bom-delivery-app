import React, { useState } from 'react';
import { View, ViewToken } from 'react-native';
import { Promotion } from '~/types';
import Indicator from './Indicator';
import { PromoSliderList, BannerImage } from './styles';

interface PromoSliderListProps {
  data: Promotion[];
}

const PromoSlider: React.FC<PromoSliderListProps> = ({ data }) => {
  const [index, setIndex] = useState(0);

  const onViewRef = React.useRef((viewableItems: { changed: ViewToken[] }) => {
    if (viewableItems?.changed[0]) {
      const currentIndex = viewableItems?.changed[0].index;
      if (currentIndex || currentIndex === 0) setIndex(currentIndex);
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <>
      <PromoSliderList
        data={data}
        windowSize={3}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        keyExtractor={item => String(item.id)}
        pagingEnabled
        snapToInterval={310}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <BannerImage source={{ uri: item.bannerUrl }} />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
      <Indicator itemCount={data.length} currentIndex={index} />
    </>
  );
};

export default PromoSlider;
