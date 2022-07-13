import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomSwitcher = styled(Switch)`
  height: 3.2rem;
  width: 6.6rem;
  padding: 0;

  & .MuiSwitch-track {
    border-radius: ${({ theme }) => theme.spacing(16)};
    border: solid 1.5px rgba(35 31 32 / 40%);
    background-color: ${({ theme }) => theme.palette.grey[400]};
    opacity: 100%;
  }

  & .MuiSwitch-switchBase {
    padding: 0;
    margin: ${({ theme }) => theme.spacing(2)};
    height: 2.7rem;
    transform: translateX(4px);

    & .MuiSwitch-thumb {
      width: 2.4rem;
      height: 2.4rem;
      ${({ theme }) => theme.mixins.switcherBoxShadowMixin};
    }

    &.Mui-checked {
      color: ${({ theme }) => theme.palette.common.white};
      transform: translateX(3.2rem);

      & + .MuiSwitch-track {
        background-color: ${({ theme }) => theme.palette.success.dark};
        opacity: 100%;
      }

      &.Mui-disabled {
        color: ${({ theme }) => theme.palette.common.white};
        opacity: 80%;
      }
    }

    &.Mui-disabled + .MuiSwitch-track {
      opacity: 40%;
      pointer-events: initial;
      cursor: not-allowed;
    }

    &.Mui-disabled .MuiSwitch-thumb {
      background: ${({ theme }) => theme.palette.common.white};
      opacity: 80%;
      pointer-events: initial;
      cursor: not-allowed;
    }
  }
`;
