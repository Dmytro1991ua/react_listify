import { Typography } from '@mui/material';
import { ReactElement } from 'react';

import {
  ActionButtonsWrapper,
  BackIcon,
  HeaderContentWrapper,
  SecondaryButton,
  SectionHeaderWrapper,
} from './section-header.styled';
import Button from '../button/button';

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
  isDisabled?: boolean;
  onPrimaryButtonClick: () => Promise<void> | void;
  onSecondaryButtonClick?: () => void;
  onGoBack?: () => void;
}

const SectionHeader = ({
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  isShoppingListDetails,
  isDisabled,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onGoBack,
}: SectionHeaderProps): ReactElement => {
  const renderGoBackButton = (
    <>
      {isShoppingListDetails && (
        <Button ariaLabel='go-back' variant='transparent' onClick={() => onGoBack && onGoBack()}>
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
          onClick={() => onSecondaryButtonClick && onSecondaryButtonClick()}>
          {secondaryBtnLabel}
        </SecondaryButton>
      )}
      <Button disabled={isDisabled} variant='primaryContained' onClick={onPrimaryButtonClick}>
        {primaryBtnLabel}
      </Button>
    </>
  );

  return (
    <SectionHeaderWrapper container alignItems='center'>
      <HeaderContentWrapper>
        {renderGoBackButton}
        <Typography sx={{ fontWeight: 'bold', marginLeft: isShoppingListDetails ? '1.5rem' : 0 }} variant='h3'>
          {title}
        </Typography>
      </HeaderContentWrapper>
      <ActionButtonsWrapper>{renderHeaderActions}</ActionButtonsWrapper>
    </SectionHeaderWrapper>
  );
};

export default SectionHeader;
