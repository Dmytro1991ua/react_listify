import { CheckboxLabel, SectionWrapper } from './cards-header-actions.styled';
import { DEFAULT_BUTTON_LABEL, DEFAULT_CHECKBOX_LABEL } from './constants';
import { useCardHeaderActions } from './hooks/useCardHeaderActions';
import DeleteProductItemModal from '../../../modules/shopping-list-details/components/delete-product-item-modal/delete-product-item-modal';
import Button from '../button/button';
import Checkbox from '../checkbox/checkbox';

type CardsHeaderActionsProps = {
  isChecked?: boolean;
  isDisabled?: boolean;
  indeterminate?: boolean;
  buttonLabel?: string;
  customSize?: string;
  checkboxLabel?: string;
  modalTitle?: string;
  onClick?: () => void;
  onToggle?: (value?: boolean) => void;
};

const CardsHeaderActions = ({
  isChecked,
  isDisabled,
  indeterminate,
  buttonLabel = DEFAULT_BUTTON_LABEL,
  customSize = '3rem',
  checkboxLabel = DEFAULT_CHECKBOX_LABEL,
  modalTitle,
  onClick,
  onToggle,
}: CardsHeaderActionsProps) => {
  const { isModalVisible, onModalClose, onModalOpen, onToggleAllItems, onDeleteAllItems } = useCardHeaderActions({
    onClick,
    onToggle,
  });

  return (
    <SectionWrapper>
      <CheckboxLabel
        control={
          <Checkbox
            checked={isChecked}
            customSize={customSize}
            indeterminate={indeterminate}
            onChange={onToggleAllItems}
          />
        }
        label={checkboxLabel}
      />
      <Button disabled={isDisabled} variant={'primaryContained'} onClick={onModalOpen}>
        {buttonLabel}
      </Button>
      <DeleteProductItemModal
        isModalOpen={isModalVisible}
        title={modalTitle}
        onDelete={onDeleteAllItems}
        onModalClose={onModalClose}
      />
    </SectionWrapper>
  );
};

export default CardsHeaderActions;
