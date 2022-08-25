import { FormikProps, useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { Bars } from 'react-loader-spinner';

import { AppRoutes } from '../../app.enums';
import history from '../../services/history.service';
import FallbackMessage from '../../shared/components/fallback-message/fallback-message';
import SectionHeader from '../../shared/components/section-header/section-header';
import CreateShoppingListModal from './components/create-shopping-list-modal/create-shopping-list-modal';
import {
  CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
  CREATE_SHOPPING_LIST_FORM_VALIDATION,
} from './components/create-shopping-list-modal/create-shopping-list-modal.schema';
import DeleteShoppingListModal from './components/delete-shopping-list-modal/delete-shopping-list-modal';
import ShoppingList from './components/shopping-list/shopping-list';
import {
  SHOPPING_LISTS_FALLBACK_MESSAGE_SUBTITLE,
  SHOPPING_LISTS_FALLBACK_MESSAGE_TITLE,
} from './shopping-lists.contants';
import { CreateShoppingListFromInitialValues } from './shopping-lists.interfaces';
import { useShoppingListsStore } from './shopping-lists.store';
import { ItemWrapper } from './shopping-lists.styled';

const ShoppingLists = (): ReactElement => {
  const createShoppingList = useShoppingListsStore((state) => state.createNewShoppingList);
  const shoppingList = useShoppingListsStore((state) => state.shoppingList);
  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';
  const deleteShoppingList = useShoppingListsStore((state) => state.removeShoppingList);
  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [shoppingListItemId, setShoppingListItemId] = useState('');

  const isMenuOpened = Boolean(anchorElement);

  const formikInstance: FormikProps<CreateShoppingListFromInitialValues> =
    useFormik<CreateShoppingListFromInitialValues>({
      initialValues: CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
      validationSchema: CREATE_SHOPPING_LIST_FORM_VALIDATION,
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        handleFormSubmit(values);

        resetForm();
      },
    });

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorElement(event.currentTarget);
  }

  function handleMenuClose(): void {
    setAnchorElement(null);
  }

  function handleCardDoubleClick(shoppingListId: string): void {
    history.push(`${AppRoutes.ShoppingLists}/${shoppingListId}`);
  }

  function handleOpenCreateModal(): void {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal(): void {
    setIsCreateModalOpen(false);

    formikInstance.resetForm();
  }

  function handleOpenDeleteModal(id: string): void {
    setIsDeleteModalOpen(true);
    setShoppingListItemId(id);
  }

  function handleCloseDeleteModal(): void {
    setIsDeleteModalOpen(false);
  }

  async function handleFormSubmit(values: CreateShoppingListFromInitialValues): Promise<void> {
    try {
      const payload: ShoppingList = {
        ...shoppingList,
        name: values.name,
      };

      await createShoppingList(payload);
      handleCloseCreateModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function handleShoppingListDeletion(): Promise<void> {
    try {
      await deleteShoppingList(shoppingListItemId);
      handleCloseDeleteModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  const renderFallbackMessageOrShoppingLists = (
    <>
      {!availableShoppingLists.length ? (
        <ItemWrapper>
          <FallbackMessage
            subtitle={SHOPPING_LISTS_FALLBACK_MESSAGE_SUBTITLE}
            title={SHOPPING_LISTS_FALLBACK_MESSAGE_TITLE}
          />
        </ItemWrapper>
      ) : (
        availableShoppingLists.map((list) => (
          <ShoppingList
            key={list._id}
            anchorElement={anchorElement}
            isMenuOpened={isMenuOpened}
            list={list}
            onDoubleClick={handleCardDoubleClick}
            onMenuClose={handleMenuClose}
            onMenuOpen={handleMenuOpen}
            onModalOpen={handleOpenDeleteModal}
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
        formikInstance={formikInstance}
        open={isCreateModalOpen}
        primaryBtnLabel='Submit'
        secondaryBtnLabel='Close'
        title='Create a List'
        onClose={handleCloseCreateModal}
        onSubmit={formikInstance.submitForm}
      />
      <DeleteShoppingListModal
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
