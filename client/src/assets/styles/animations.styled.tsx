import { keyframes } from '@mui/system';

export const rotation = keyframes`
  0% {
    transform: rotate(0deg);
    background-color: #11d6f5;
  }

  50% {
    margin-top: 2rem;
    background-color: #d9faf9;
  }
 
  100% {
    transform: rotate(90deg);
    background-color: #11d6f5;
  }
`;

export const gear = keyframes`
  0% {
    transform: rotate(0deg);
    background-color: #3d8f28;
  }

  50% {
    margin-top: 15px;
    background-color: #15f20a;
  }

  100% {
    transform: rotate(-90deg);
    background-color: #3d8f28;
  }
`;
