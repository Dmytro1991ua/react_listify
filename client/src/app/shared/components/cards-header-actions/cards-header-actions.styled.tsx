import { FormControlLabel, styled } from '@mui/material';

export const SectionWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: ${({ theme }) => theme.spacing(10)};
  border-bottom: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  margin-left: 0;
  margin-right: 0;
  padding-left: ${({ theme }) => theme.spacing(20)};
  margin-bottom: ${({ theme }) => theme.spacing(20)};

  @media (width >= 32.5em) {
    flex-direction: row;
  }

  button {
    font-size: clamp(1.3rem, -1.875rem + 7.5vw, 1.5rem);
  }
`;

export const CheckboxLabel = styled(FormControlLabel)`
  & .MuiTypography-root {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: ${({ theme }) => theme.spacing(5)};
  }
`;
