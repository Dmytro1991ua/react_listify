import { Typography, styled } from '@mui/material';

import { CurrenciesSelect } from '../../../../shared/components/create-shopping-list-modal/create-shopping-list-modal.styled';
import { InputDivider } from '../../../shopping-list-details/components/edit-product-item-modall/edit-product-item-modal.styled';

export const InputFieldDivider = styled(InputDivider)`
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
`;

export const ProfileCurrenciesSelect = styled(CurrenciesSelect)`
  max-width: 40rem;
`;

export const FieldLabel = styled(Typography)`
  margin: 0;
  opacity: 0.8;
`;
