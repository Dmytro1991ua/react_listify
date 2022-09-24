import { Box } from '@mui/material';
import { Form, FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';

import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { InputDivider } from '../../../shopping-list-details/components/edit-product-item-modall/edit-product-item-modal.styled';
import { ProfileFormsInitialValues } from '../../profile.interfaces';

interface ProfileUserInformationFieldsProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
}

const ProfileUserInformationFields = ({ formikInstance }: ProfileUserInformationFieldsProps): ReactElement => {
  return (
    <FormikProvider value={formikInstance}>
      <Box sx={{ flex: 1, marginLeft: '2rem' }}>
        <Form>
          <InputDivider>
            <FormikInput disabled fullWidth id='email' name='email' placeholder='Enter your email' />
          </InputDivider>
          <InputDivider>
            <FormikInput fullWidth id='name' name='name' placeholder='Enter your name' />
          </InputDivider>
        </Form>
      </Box>
    </FormikProvider>
  );
};

export default ProfileUserInformationFields;
