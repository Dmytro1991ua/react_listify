import styled from '@emotion/styled';

import { gear, rotation } from '../../../../assets/styles/animations.styled';

export const LoaderContainer = styled('div')`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Box1 = styled('div')`
  width: 6rem;
  height: 6rem;
  margin-right: 3rem;
  border: 4px solid #11d6f5;
  animation: ${rotation} 0.5s infinite ease-in-out;
`;

export const Box2 = styled('div')`
  width: 6rem;
  height: 6rem;
  border: 4px solid #3d8f28;
  animation: ${gear} 0.5s infinite ease-in-out;
`;
