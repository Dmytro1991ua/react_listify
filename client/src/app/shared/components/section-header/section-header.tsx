import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement } from 'react';

import Button from '../button/button';
import { BackIcon, SecondaryButton, SectionHeaderWrapper } from './section-header.styled';

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
  disabled?: boolean;
  onPrimaryButtonClick: () => Promise<void> | void;
  onSecondaryButtonClick?: () => void;
  onGoBack?: () => void;
}

const SectionHeader = ({
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  isShoppingListDetails,
  disabled,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onGoBack,
}: SectionHeaderProps): ReactElement => {
  const renderGoBackButton = (
    <>
      {isShoppingListDetails && (
        <Button variant='transparent' onClick={() => onGoBack && onGoBack()}>
          <BackIcon />
        </Button>
      )}
    </>
  );

  const renderHeaderActions = (
    <>
      {isShoppingListDetails && (
        <SecondaryButton
          isShoppingListDetails={isShoppingListDetails}
          variant='secondaryContained'
          onClick={() => onSecondaryButtonClick && onSecondaryButtonClick()}
        >
          {secondaryBtnLabel}
        </SecondaryButton>
      )}
      <Button disabled={disabled} variant='primaryContained' onClick={onPrimaryButtonClick}>
        {primaryBtnLabel}
      </Button>
    </>
  );

  return (
    <SectionHeaderWrapper container alignItems='center'>
      {renderGoBackButton}
      <Typography sx={{ fontWeight: 'bold', marginLeft: isShoppingListDetails ? '1.5rem' : 0 }} variant='h3'>
        {title}
      </Typography>
      <Box sx={{ marginLeft: 'auto' }}>{renderHeaderActions}</Box>
    </SectionHeaderWrapper>
  );
};

export default SectionHeader;
