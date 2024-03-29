import React from 'react';

import Typography from '../Typography';
import { Category } from '~/types';
import {
  CategorySliderList,
  CategorySliderItem,
  CategorySliderImage,
  CategorySliderTitle,
} from './styles';

interface CategorySliderProps {
  data: Category[];
  onCategoryClick: (category: string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  data,
  onCategoryClick,
}) => {
  return (
    <CategorySliderList
      data={data}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <CategorySliderItem
          key={item.id}
          onPress={() => onCategoryClick(item.title)}
        >
          <CategorySliderImage source={{ uri: item.imageUrl }} />
          <CategorySliderTitle>
            <Typography size="16" color="#7E7E7E" align="center">
              {item.title}
            </Typography>
          </CategorySliderTitle>
        </CategorySliderItem>
      )}
    />
  );
};

export default CategorySlider;
