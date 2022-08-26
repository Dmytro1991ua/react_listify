import { FormikProps, useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { v4 as uuidv4 } from 'uuid';

import { AppRoutes, Currencies } from '../../app.enums';
import history from '../../services/history.service';
import CreateShoppingListModal from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal';
import {
  CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
  CREATE_SHOPPING_LIST_FORM_VALIDATION,
} from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal.schema';
import DeleteConfirmationModal from '../../shared/components/delete-confirmation-modal/delete-confirmation-modal';
import FallbackMessage from '../../shared/components/fallback-message/fallback-message';
import SectionHeader from '../../shared/components/section-header/section-header';
import { DropdownOption } from '../../shared/components/select/select.interfaces';
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
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const [shoppingListId, setShoppingListId] = useState('');

  const isMenuOpened = Boolean(anchorElement);
  const availableCurrencies: DropdownOption<string>[] = Object.entries(Currencies).flatMap((currency) => ({
    id: uuidv4(),
    value: currency[1],
    label: currency[1],
  }));

  const formikInstance: FormikProps<CreateShoppingListFromInitialValues> =
    useFormik<CreateShoppingListFromInitialValues>({
      initialValues: CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE(),
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

  function handleOpenDeleteModal(id: string): void {
    setIsDeleteModalOpen(true);
    setShoppingListId(id);
  }

  function handleCloseDeleteModal(): void {
    setIsDeleteModalOpen(false);
  }

  function handleSelectFiledChange(event: React.ChangeEvent<HTMLInputElement>) {
    formikInstance.setFieldValue('currency', event.target.value);
  }

  function handleCreateShoppingList(): void {
    setValidateAfterSubmit(true);
    formikInstance.submitForm();
  }

  async function handleFormSubmit(values: CreateShoppingListFromInitialValues): Promise<void> {
    try {
      const payload: ShoppingList = {
        ...shoppingList,
        name: values.name,
        currency: values.currency ?? '',
      };

      await createShoppingList(payload);
      handleCloseCreateModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function handleShoppingListDeletion(): Promise<void> {
    try {
      await deleteShoppingList(shoppingListId);
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
        isShoppingList
        formikInstance={formikInstance}
        isDirty={!formikInstance.dirty}
        open={isCreateModalOpen}
        options={availableCurrencies}
        primaryBtnLabel='Submit'
        secondaryBtnLabel='Close'
        title='Create a List'
        onClose={handleCloseCreateModal}
        onSelectChange={handleSelectFiledChange}
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
