import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement } from 'react';

import Button from '../button/button';
import { SecondaryButton, SectionHeaderWrapper } from './section-header.styled';

interface SectionHeaderProps {
  /**
   * @param {string} Defines a section title
   * @example 'Shopping List'
   */
  title: string;
  /**
   * @param {string} Defines a primary button label
   * @example 'Add List'
   */
  primaryBtnLabel: string;
  /**
   * @param {string} Defines a secondary button label
   * @default undefined
   * @example 'Create Copy'
   */
  secondaryBtnLabel?: string;
  /**
   * @param {boolean} Defines whether we work with shopping list details or not
   * Allows to show or hide a secondary button
   * @default undefined
   * @example 'Create Copy'
   */
  isShoppingListDetails?: boolean;
  onClick: () => void;
}

const SectionHeader = ({
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  isShoppingListDetails,
  onClick,
}: SectionHeaderProps): ReactElement => {
  return (
    <SectionHeaderWrapper container alignItems='center'>
      <Typography sx={{ fontWeight: 'bold' }} variant='h3'>
        {title}
      </Typography>
      <Box sx={{ marginLeft: 'auto' }}>
        {isShoppingListDetails && (
          <SecondaryButton isShoppingListDetails={isShoppingListDetails} variant='secondaryContained' onClick={onClick}>
            {secondaryBtnLabel}
          </SecondaryButton>
        )}
        <Button variant='primaryContained' onClick={onClick}>
          {primaryBtnLabel}
        </Button>
      </Box>
    </SectionHeaderWrapper>
  );
};

export default SectionHeader;
