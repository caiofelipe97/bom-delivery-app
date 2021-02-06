import React from 'react';
import { View } from 'react-native';
import Typography from '../Typography';
import { Container, SectionHeader, Left } from './styles';

interface SectionProps {
  title: string;
  subTitle?: string;
  noMargin?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  subTitle,
  noMargin,
  children,
}) => {
  return (
    <Container noMargin={noMargin}>
      {title && (
        <SectionHeader>
          <Left>
            <View>
              <Typography bold color="#333" size="24">
                {title}
              </Typography>
              {subTitle && (
                <Typography size="16" color="#999">
                  {subTitle}
                </Typography>
              )}
            </View>
          </Left>
        </SectionHeader>
      )}
      {children}
    </Container>
  );
};

export default Section;
