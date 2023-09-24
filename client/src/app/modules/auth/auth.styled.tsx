import { FormControl, styled } from '@mui/material';
import { Form } from 'formik';
import { NavLink } from 'react-router-dom';

import Button from '../../shared/components/button/button';

export const FormWrapper = styled(Form)`
  padding: ${({ theme }) => theme.spacing(20)};
  background-color: ${({ theme }) => theme.palette.common.white};
  border: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  border-radius: ${({ theme }) => theme.spacing(12)};
  ${({ theme }) => theme.mixins.formBoxShadowMixin}
  text-align: center;

  @media (width >= 62em) {
    background-color: transparent;
  }
`;

export const FormInputContainer = styled(FormControl)`
  margin-bottom: ${({ theme }) => theme.spacing(20)};
`;

export const InputLabel = styled('label')`
  ${({ theme }) => theme.typography.subtitle1};
  color: ${({ theme }) => theme.palette.grey[400]};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  text-align: left;
`;

export const FormSubmitButton = styled(Button)`
  font-size: 1.6rem;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(12)};
  }
`;

export const FormLink = styled(NavLink)`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.success.dark};
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.palette.common.black};
  }

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(10)};
  }
`;
