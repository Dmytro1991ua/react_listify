import { FormikProps, useFormik } from 'formik';
import { ReactElement, useMemo, useState } from 'react';
import { Bars } from 'react-loader-spinner';

import { AppRoutes, Currencies } from '../../app.enums';
import { ShoppingListData } from '../../app.interfaces';
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
import { createShoppingListAction, deleteShoppingListAction } from './shopping-lists.actions';
import {
  SHOPPING_LISTS_FALLBACK_MESSAGE_SUBTITLE,
  SHOPPING_LISTS_FALLBACK_MESSAGE_TITLE,
} from './shopping-lists.contants';
import { CreateShoppingListFromInitialValues } from './shopping-lists.interfaces';
import { useShoppingListsStore } from './shopping-lists.store';
import { ItemWrapper } from './shopping-lists.styled';

const ShoppingLists = (): ReactElement => {
  const shoppingList = useShoppingListsStore((state) => state.shoppingList);
  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';
  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);
  const user = useAuthStore((state) => state.user);

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [shoppingListId, setShoppingListId] = useState('');

  const isMenuOpened = Boolean(anchorElement);
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

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setAnchorElement(event.currentTarget);
  }

  function handleMenuClose(): void {
    setAnchorElement(null);
  }

  function handleCardDoubleClick(id: string): void {
    history.push(`${AppRoutes.ShoppingLists}/${id}`);
  }

  function handleOpenCreateModal(): void {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal(): void {
    setIsCreateModalOpen(false);
    setValidateAfterSubmit(false);

    formikInstance.resetForm();
  }

  function handleOpenDeleteModal(): void {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal(): void {
    setIsDeleteModalOpen(false);
  }

  function handleCreateShoppingList(): void {
    setValidateAfterSubmit(true);
    formikInstance.submitForm();
  }

  function handleRedirectToDetails(): void {
    history.push(`${AppRoutes.ShoppingLists}/${shoppingListId}`);
  }

  async function handleFormSubmit(values: CreateShoppingListFromInitialValues): Promise<void> {
    try {
      const payload: ShoppingListData = {
        ...shoppingList,
        name: values.name,
        currency: values.currency ?? Currencies.Default,
      };

      await createShoppingListAction(payload);
      handleCloseCreateModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function handleShoppingListDeletion(): Promise<void> {
    try {
      await deleteShoppingListAction(shoppingListId);
      handleCloseDeleteModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
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
            isMenuOpened={isMenuOpened}
            list={list}
            onDoubleClick={handleCardDoubleClick}
            onMenuClose={handleMenuClose}
            onMenuOpen={handleMenuOpen}
            onModalOpen={handleOpenDeleteModal}
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
      <SectionHeader primaryBtnLabel='Add List' title='Shopping List' onPrimaryButtonClick={handleOpenCreateModal} />
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
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateShoppingList}
      />
      <DeleteConfirmationModal
        fullWidth
        open={isDeleteModalOpen}
        primaryBtnLabel='Yes'
        secondaryBtnLabel='No'
        title='Are you sure you want to delete it?'
        onClose={handleCloseDeleteModal}
        onSubmit={handleShoppingListDeletion}
      />
    </>
  );
};

export default ShoppingLists;
