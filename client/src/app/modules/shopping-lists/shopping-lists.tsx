import { Box } from '@mui/system';
import { FormikProps, useFormik } from 'formik';
import { ReactElement, useMemo, useState } from 'react';
import { Bars } from 'react-loader-spinner';

import EditShoppingListModal from './components/edit-shopping-list-modal/edit-shopping-list-modal';
import {
  EDIT_SHOPPING_LIST_FORM_INITIAL_VALUE,
  EDIT_SHOPPING_LIST_FORM_VALIDATION,
} from './components/edit-shopping-list-modal/edit-shopping-list-modal.schema';
import { EditShoppingListFormInitialValues } from './components/edit-shopping-list-modal/edit-shopping-list.modal.interfaces';
import ShoppingList from './components/shopping-list/shopping-list';
import { useShoppingListsModal } from './hooks/useShoppingListsModal';
import {
  addShoppingListToFavoritesAction,
  deleteAllShoppingListsAction,
  selectAllShoppingListsAction,
} from './shopping-lists.actions';
import {
  DESELECT_ITEMS_CHECKBOX_LABEl,
  SELECT_ALL_CHECKBOX_LABEL,
  SHOPPING_LISTS_FALLBACK_MESSAGE_SUBTITLE,
  SHOPPING_LISTS_FALLBACK_MESSAGE_TITLE,
} from './shopping-lists.contants';
import { CreateShoppingListFromInitialValues } from './shopping-lists.interfaces';
import { useShoppingListsStore } from './shopping-lists.store';
import { ItemWrapper } from './shopping-lists.styled';
import { AppRoutes } from '../../app.enums';
import { ShoppingListData } from '../../app.interfaces';
import { useDropdownMenu } from '../../cdk/hooks/useDropdownMenu';
import history from '../../services/history.service';
import CardsHeaderActions from '../../shared/components/cards-header-actions/cards-header-actions';
import CreateShoppingListModal from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal';
import {
  CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
  CREATE_SHOPPING_LIST_FORM_VALIDATION,
} from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal.schema';
import DeleteConfirmationModal from '../../shared/components/delete-confirmation-modal/delete-confirmation-modal';
import FallbackMessage from '../../shared/components/fallback-message/fallback-message';
import SectionHeader from '../../shared/components/section-header/section-header';
import {
  areAllItemsChecked,
  availableCurrencies,
  getCurrentShoppingList,
  sortedDropdownItems,
  sortedItems,
} from '../../utils';
import { useAuthStore } from '../auth/auth.store';

const ShoppingLists = (): ReactElement => {
  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';
  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);
  const user = useAuthStore((state) => state.user);

  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [shoppingListId, setShoppingListId] = useState('');

  const sortedAvailableCurrencies = sortedDropdownItems(availableCurrencies);
  const sortedItemsByName = useMemo(() => sortedItems(availableShoppingLists, 'isFavorite'), [availableShoppingLists]);

  const currentShoppingList = useMemo(
    () => getCurrentShoppingList(availableShoppingLists, shoppingListId),
    [availableShoppingLists, shoppingListId]
  );

  const allShoppingListsChecked = useMemo(
    () => areAllItemsChecked<ShoppingListData>(sortedItemsByName as ShoppingListData[]),
    [sortedItemsByName]
  );

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

  const formikEditFormInstance: FormikProps<EditShoppingListFormInitialValues> =
    useFormik<EditShoppingListFormInitialValues>({
      initialValues: EDIT_SHOPPING_LIST_FORM_INITIAL_VALUE(currentShoppingList?.name),
      validationSchema: EDIT_SHOPPING_LIST_FORM_VALIDATION,
      enableReinitialize: true,
      validateOnBlur: validateAfterSubmit,
      validateOnChange: validateAfterSubmit,
      onSubmit: (values, { resetForm }) => {
        handleEditFormSubmit(values);

        resetForm();
      },
    });

  const {
    isCreateModalOpen,
    isDeleteModalOpen,
    isEditModalOpen,
    onCloseEditModal,
    onEditShoppingList,
    onOpenEditModal,
    onEditShoppingListFormSubmit,
    onOpenCreateModal,
    onCloseCreateModal,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onCreateShoppingList,
    onShoppingListDeletion,
    onCreateShoppingListFormSubmit,
  } = useShoppingListsModal({ formikInstance, formikEditFormInstance, shoppingListId, setValidateAfterSubmit });
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

  async function handleEditFormSubmit(values: EditShoppingListFormInitialValues): Promise<void> {
    await onEditShoppingListFormSubmit(values);
  }

  async function onAddShoppingListToFavorites(shoppingListId: string): Promise<void> {
    try {
      await addShoppingListToFavoritesAction(shoppingListId);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async function onSelectAllShoppingLists() {
    try {
      await selectAllShoppingListsAction();
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async function onDeleteAllShoppingLists() {
    try {
      await deleteAllShoppingListsAction();
    } catch (e) {
      throw new Error((e as Error).message);
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
            isMenuOpened={isDropdownMenuOpened}
            isShoppingList={true}
            list={list}
            onAddToFavorites={onAddShoppingListToFavorites}
            onDoubleClick={handleCardDoubleClick}
            onEditShoppingList={onOpenEditModal}
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

  const renderCardsHeaderActions = (
    <>
      {sortedItemsByName && !!sortedItemsByName.length && (
        <CardsHeaderActions
          checkboxLabel={allShoppingListsChecked ? DESELECT_ITEMS_CHECKBOX_LABEl : SELECT_ALL_CHECKBOX_LABEL}
          isChecked={allShoppingListsChecked}
          isDisabled={!allShoppingListsChecked}
          modalTitle='Are you sure you want to delete all selected shopping lists'
          onClick={onDeleteAllShoppingLists}
          onToggle={onSelectAllShoppingLists}
        />
      )}
    </>
  );

  const modalLoader = (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Bars color='#1b5e20' height={40} width={40} />
    </Box>
  );

  return (
    <>
      <SectionHeader
        isDisabled={allShoppingListsChecked}
        primaryBtnLabel='Add List'
        title='Shopping Lists'
        onPrimaryButtonClick={onOpenCreateModal}
      />
      {renderCardsHeaderActions}
      {renderAvailableShoppingLists}
      <CreateShoppingListModal
        fullWidth
        isShoppingList
        formikInstance={formikInstance}
        isDirty={!formikInstance.dirty}
        isLoading={isLoading}
        loader={modalLoader}
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
      <EditShoppingListModal
        fullWidth
        formikInstance={formikEditFormInstance}
        isDirty={!formikEditFormInstance.dirty}
        isLoading={isLoading}
        loader={modalLoader}
        open={isEditModalOpen}
        primaryBtnLabel='Ok'
        secondaryBtnLabel='Cancel'
        title='Edit a List'
        onClose={onCloseEditModal}
        onSubmit={onEditShoppingList}
      />
    </>
  );
};

export default ShoppingLists;
