import { styled } from '@mui/material/styles';

export const ImagePreviewSection = styled('section', { shouldForwardProp: (prop) => prop !== 'textPosition' })<{
  textPosition?: string;
}>`
  position: relative;
  height: 100vh;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  p {
    position: absolute;
    top: ${({ textPosition }) => (textPosition ? `${textPosition}%` : '50%')};
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
    color: ${({ theme }) => theme.palette.common.white};
    text-align: center;
    width: 100%;
    margin: 0;
    padding: 0 1rem;
  }
`;
