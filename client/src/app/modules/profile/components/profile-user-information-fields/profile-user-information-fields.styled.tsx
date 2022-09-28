import { styled } from '@mui/material';
import { Form } from 'formik';

export const FormWrapper = styled('div')`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing(20)};
`;

export const UserInformationForm = styled(Form, { shouldForwardProp: (prop) => prop !== 'isUploading' })<{
  isUploading?: boolean;
}>`
  margin-top: ${({ isUploading }) => (isUploading ? '-2rem' : 0)};
`;
