import { FormikProps, useFormik } from 'formik';
import { ReactElement, useMemo, useState } from 'react';
import { Bars } from 'react-loader-spinner';

import { AppRoutes } from '../../app.enums';
import { useDropdownMenu } from '../../cdk/hooks/useDropdownMenu';
import history from '../../services/history.service';
import CreateShoppingListModal from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal';
import {
  CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
  CREATE_SHOPPING_LIST_FORM_VALIDATION,
} from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal.schema';
import DeleteConfirmationModal from '../../shared/components/delete-confirmation-modal/delete-confirmation-modal';
import FallbackMessage from '../../shared/components/fallback-message/fallback-message';
import SectionHeader from '../../shared/components/section-header/section-header';
import { availableCurrencies, sortedDropdownItems, sortedItems } from '../../utils';
import { useAuthStore } from '../auth/auth.store';
import ShoppingList from './components/shopping-list/shopping-list';
import { useShoppingListsModal } from './hooks/useShoppingListsModal';
import {
  SHOPPING_LISTS_FALLBACK_MESSAGE_SUBTITLE,
  SHOPPING_LISTS_FALLBACK_MESSAGE_TITLE,
} from './shopping-lists.contants';
import { CreateShoppingListFromInitialValues } from './shopping-lists.interfaces';
import { useShoppingListsStore } from './shopping-lists.store';
import { ItemWrapper } from './shopping-lists.styled';

const ShoppingLists = (): ReactElement => {
  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';
  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);
  const user = useAuthStore((state) => state.user);

  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [shoppingListId, setShoppingListId] = useState('');

  const sortedAvailableCurrencies = sortedDropdownItems(availableCurrencies);
  const sortedItemsByName = useMemo(() => sortedItems(availableShoppingLists), [availableShoppingLists]);

  const formikInstance: FormikProps<CreateShoppingListFromInitialValues> =
    useFormik<CreateShoppingListFromInitialValues>({
      initialValues: CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE('', user?.currency),
      validationSchema: CREATE_SHOPPING_LIST_FORM_VALIDATION,
      enableReinitialize: true,
      validateOnBlur: validateAfterSubmit,
      validateOnChange: validateAfterSubmit,
      onSubmit: (values, { resetForm }) => {
        setValidateAfterSubmit(false);
        handleFormSubmit(values);

        resetForm();
      },
    });

  const {
    isCreateModalOpen,
    isDeleteModalOpen,
    onOpenCreateModal,
    onCloseCreateModal,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onCreateShoppingList,
    onShoppingListDeletion,
    onCreateShoppingListFormSubmit,
  } = useShoppingListsModal({ formikInstance, shoppingListId, setValidateAfterSubmit });
  const { anchorElement, isDropdownMenuOpened, onDropdownMenuClose, onDropdownMenuOpen } = useDropdownMenu();

  function handleCardDoubleClick(id: string): void {
    history.push(`${AppRoutes.ShoppingLists}/${id}`);
  }

  function handleRedirectToDetails(): void {
    history.push(`${AppRoutes.ShoppingLists}/${shoppingListId}`);
  }

  async function handleFormSubmit(values: CreateShoppingListFromInitialValues): Promise<void> {
    await onCreateShoppingListFormSubmit(values);
  }

  const renderFallbackMessageOrShoppingLists = (
    <>
      {!sortedItemsByName.length ? (
        <ItemWrapper>
          <FallbackMessage
            subtitle={SHOPPING_LISTS_FALLBACK_MESSAGE_SUBTITLE}
            title={SHOPPING_LISTS_FALLBACK_MESSAGE_TITLE}
          />
        </ItemWrapper>
      ) : (
        sortedItemsByName.map((list) => (
          <ShoppingList
            key={list._id}
            anchorElement={anchorElement}
            calculateTotalPriceByQuantity={user?.calculateByQuantity}
            isMenuOpened={isDropdownMenuOpened}
            isShoppingList={true}
            list={list}
            onDoubleClick={handleCardDoubleClick}
            onMenuClose={onDropdownMenuClose}
            onMenuOpen={onDropdownMenuOpen}
            onModalOpen={onOpenDeleteModal}
            onRedirectToDetails={handleRedirectToDetails}
            onSetShoppingListId={setShoppingListId}
          />
        ))
      )}
    </>
  );

  const renderAvailableShoppingLists = (
    <>
      {isLoading ? (
        <ItemWrapper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Bars color='#1b5e20' height={120} width={120} />
        </ItemWrapper>
      ) : (
        renderFallbackMessageOrShoppingLists
      )}
    </>
  );

  return (
    <>
      <SectionHeader primaryBtnLabel='Add List' title='Shopping List' onPrimaryButtonClick={onOpenCreateModal} />
      {renderAvailableShoppingLists}
      <CreateShoppingListModal
        fullWidth
        isShoppingList
        formikInstance={formikInstance}
        isDirty={!formikInstance.dirty}
        open={isCreateModalOpen}
        options={sortedAvailableCurrencies}
        primaryBtnLabel='Submit'
        secondaryBtnLabel='Close'
        title='Create a List'
        onClose={onCloseCreateModal}
        onSubmit={onCreateShoppingList}
      />
      <DeleteConfirmationModal
        fullWidth
        open={isDeleteModalOpen}
        primaryBtnLabel='Yes'
        secondaryBtnLabel='No'
        title='Are you sure you want to delete it?'
        onClose={onCloseDeleteModal}
        onSubmit={onShoppingListDeletion}
      />
    </>
  );
};

export default ShoppingLists;
