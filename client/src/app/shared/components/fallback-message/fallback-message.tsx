import { ReactElement } from 'react';

import { FallbackMessageWrapper, Subtitle, Title } from './fallback-message.styled';

interface FallbackMessageProps {
  title: string;
  subtitle: string;
}

const FallbackMessage = ({ title, subtitle }: FallbackMessageProps): ReactElement => {
  return (
    <FallbackMessageWrapper>
      <Title variant='h3'>{title}</Title>
      <Subtitle variant='h5'>{subtitle}</Subtitle>
    </FallbackMessageWrapper>
  );
};

export default FallbackMessage;
