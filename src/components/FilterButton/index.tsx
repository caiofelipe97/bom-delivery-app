import React from 'react';
import FilterIcon from '../../assets/filterListIcon.png';
import {
  FilterButtonContainer,
  FilterNumberContainer,
  FilterNumberText,
  FilterText,
  FilterImage,
} from './styles';

interface TagButtonProps {
  hasFilter: boolean;
  numberOfFilters: number;
  handleFiltersPress(): void;
}

const FilterButton: React.FC<TagButtonProps> = ({
  hasFilter,
  numberOfFilters,
  handleFiltersPress,
}) => (
  <FilterButtonContainer onPress={handleFiltersPress} hasFilter={hasFilter}>
    <FilterText hasFilter={hasFilter}>Filtros</FilterText>
    {hasFilter ? (
      <FilterNumberContainer>
        <FilterNumberText>{numberOfFilters}</FilterNumberText>
      </FilterNumberContainer>
    ) : (
      <FilterImage source={FilterIcon} />
    )}
  </FilterButtonContainer>
);

export default FilterButton;
