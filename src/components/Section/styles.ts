import styled from 'styled-components/native';

interface ContainerProps {
  noMargin?: boolean;
}

export const Container = styled.View<ContainerProps>`
  margin: ${props => (props.noMargin ? 0 : '16px 0 0')};
`;

export const SectionHeader = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 0;
`;

export const Left = styled.View`
  align-items: center;
  flex-direction: row;
`;
