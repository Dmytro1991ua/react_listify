import { FormikProps, useFormik } from 'formik';
import { ReactElement, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import { Currencies } from '../../app.enums';
import Checkbox from '../../shared/components/checkbox/checkbox';
import {
  CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
  CREATE_SHOPPING_LIST_FORM_VALIDATION,
} from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal.schema';
import FallbackMessage from '../../shared/components/fallback-message/fallback-message';
import SectionHeader from '../../shared/components/section-header/section-header';
import { useAuthStore } from '../auth/auth.store';
import { CreateShoppingListFromInitialValues } from '../shopping-lists/shopping-lists.interfaces';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';
import { ItemWrapper } from '../shopping-lists/shopping-lists.styled';
import CreateShoppingListCopyModal from './components/create-shopping-list-copy-modal/create-shopping-list-copy-modal';
import DeleteProductItemModal from './components/delete-product-item-modal/delete-product-item-modal';
import DeleteShoppingListModal from './components/delete-shopping-list-modal/delete-shopping-list-modal';
import EditProductItemModal from './components/edit-product-item-modall/edit-product-item-modal';
import { EDIT_SHOPPING_LIST_ITEM_FORM_INITIAL_VALUE } from './components/edit-product-item-modall/edit-product-item-modal.schema';
import { EditProductItemFormInitialValues } from './components/edit-product-item-modall/edit-product-item.modal.interfaces';
import ProductItem from './components/product-item/product-item';
import ProductItemsWidget from './components/product-items-widget/product-items-widget';
import { useCreateShoppingListCopy } from './hooks/useCreateShoppingListCopy';
import { useCRUDProductItem } from './hooks/useCRUDProductItem';
import { useGetCurrentShoppingList } from './hooks/useGetCurrentShoppingList';
import { useSelectProductItem } from './hooks/useSelectProductItem';
import { useShoppingListDetailsModal } from './hooks/useShoppingListDetailsModal';
import { useToggleAllProductItems } from './hooks/useToggleAllProductItems';
import {
  SHOPPING_LISTS_DETAILS_FALLBACK_MESSAGE_SUBTITLE,
  SHOPPING_LISTS_DETAILS_FALLBACK_MESSAGE_TITLE,
} from './shopping-list-details.constants';
import { AddIcon, CheckboxLabel, Form, Input } from './shopping-list-details.styled';

const ShoppingListDetails = (): ReactElement => {
  const { shoppingListId } = useParams<{ shoppingListId: string }>();

  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';
  const user = useAuthStore((state) => state.user);

  const [shoppingListItemId, setShoppingListItemId] = useState<string>('');
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const {
    currentShoppingList,
    allProductItemsChecked,
    getCurrentProductItem,
    sortedAvailableProductUnits,
    sortedItemsByNameOrSelectedState,
    onGoBack,
  } = useGetCurrentShoppingList({
    shoppingListId,
    shoppingListItemId,
  });

  const formikCreateFormInstance: FormikProps<CreateShoppingListFromInitialValues> =
    useFormik<CreateShoppingListFromInitialValues>({
      initialValues: CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE(`Copy of ${currentShoppingList?.name}`),
      validationSchema: CREATE_SHOPPING_LIST_FORM_VALIDATION,
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        setValidateAfterSubmit(false);
        handleCreateShoppingListCopy(values);

        resetForm();
      },
    });

  const formikEditFormInstance: FormikProps<EditProductItemFormInitialValues> =
    useFormik<EditProductItemFormInitialValues>({
      initialValues: EDIT_SHOPPING_LIST_ITEM_FORM_INITIAL_VALUE(getCurrentProductItem),
      validationSchema: CREATE_SHOPPING_LIST_FORM_VALIDATION,
      enableReinitialize: true,
      validateOnBlur: validateAfterSubmit,
      validateOnChange: validateAfterSubmit,
      onSubmit: (values, { resetForm }) => {
        handleEditProductItemFormSubmit(values);

        resetForm();
      },
    });

  const {
    isProductItemDeleteModalOpen,
    isShoppingListDeleteModalOpen,
    isCreateShoppingListModalOpen,
    isProductItemEditModalOpen,
    onOpenProductItemDeleteModal,
    onOpenProductItemEditModal,
    onOpenShoppingListDeleteModal,
    onOpenCreateShoppingListModal,
    onCloseProductItemEditModal,
    onCloseShoppingListDeleteModal,
    onCloseCreateShoppingListModal,
    onCloseProductItemDeleteModal,
    onEditProductItem,
  } = useShoppingListDetailsModal({
    formikInstance: formikEditFormInstance,
    onSetShoppingListItemId: setShoppingListItemId,
    onSetValidateAfterSubmit: setValidateAfterSubmit,
  });

  const {
    inputRef,
    onAddNewProduct,
    onCreateProductItemFormSubmit,
    onEditProductItemFormSubmit,
    onProductItemDeletion,
  } = useCRUDProductItem({
    shoppingListId: currentShoppingList?._id as string,
    shoppingListItemId,
    onSetValidateAfterSubmit: setValidateAfterSubmit,
    shoppingListItems: currentShoppingList?.shoppingListItems ?? [],
    onCloseModal: onCloseProductItemEditModal,
    onCloseDeleteModal: onCloseProductItemDeleteModal,
  });

  const { onToggleAllProductItems } = useToggleAllProductItems({
    id: currentShoppingList?._id ?? '',
    sortedItemsByNameOrSelectedState,
  });

  const { onCreateShoppingListCopy } = useCreateShoppingListCopy({
    currency: currentShoppingList?.currency ?? Currencies.Default,
    shoppingListItems: currentShoppingList?.shoppingListItems ?? [],
    onCloseModal: onCloseCreateShoppingListModal,
  });

  const { onSelectProductItem } = useSelectProductItem({
    shoppingListId: currentShoppingList?._id ?? '',
    shoppingListItems: currentShoppingList?.shoppingListItems ?? [],
  });

  async function handleCreateShoppingListCopy(values: CreateShoppingListFromInitialValues): Promise<void> {
    await onCreateShoppingListCopy(values);
  }

  async function handleEditProductItemFormSubmit(values: EditProductItemFormInitialValues): Promise<void> {
    await onEditProductItemFormSubmit(values);
  }

  const renderFallbackMessageOrShoppingListDetails = (
    <>
      {!sortedItemsByNameOrSelectedState.length ? (
        <ItemWrapper>
          <FallbackMessage
            subtitle={SHOPPING_LISTS_DETAILS_FALLBACK_MESSAGE_SUBTITLE}
            title={SHOPPING_LISTS_DETAILS_FALLBACK_MESSAGE_TITLE}
          />
        </ItemWrapper>
      ) : (
        <>
          {currentShoppingList &&
            sortedItemsByNameOrSelectedState.map((item) => (
              <ProductItem
                key={item._id}
                calculateTotalPriceByQuantity={user?.calculateByQuantity}
                currency={currentShoppingList.currency}
                item={item}
                onClick={onSelectProductItem}
                onDelete={onOpenProductItemDeleteModal}
                onEdit={onOpenProductItemEditModal}
              />
            ))}
        </>
      )}
    </>
  );

  const renderAvailableShoppingListItems = (
    <>
      {isLoading ? (
        <ItemWrapper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Audio color='#1b5e20' height={120} width={120} />
        </ItemWrapper>
      ) : (
        renderFallbackMessageOrShoppingListDetails
      )}
    </>
  );

  const renderCheckbox = (
    <>
      {currentShoppingList?.shoppingListItems && currentShoppingList.shoppingListItems.length > 0 && (
        <CheckboxLabel
          control={<Checkbox checked={allProductItemsChecked} customSize='3rem' onChange={onToggleAllProductItems} />}
          label='Select All Items'
        />
      )}
    </>
  );

  return (
    <>
      <DeleteProductItemModal
        isModalOpen={isProductItemDeleteModalOpen}
        onDelete={onProductItemDeletion}
        onModalClose={onCloseShoppingListDeleteModal}
      />
      <EditProductItemModal
        formikInstance={formikEditFormInstance}
        open={isProductItemEditModalOpen}
        options={sortedAvailableProductUnits}
        primaryBtnLabel='Change'
        title='Edit Product Item'
        onClose={onCloseProductItemEditModal}
        onSubmit={onEditProductItem}
      />
      <DeleteShoppingListModal
        isModalOpen={isShoppingListDeleteModalOpen}
        shoppingListId={currentShoppingList?._id as string}
        onModalOpen={onCloseShoppingListDeleteModal}
      />
      <CreateShoppingListCopyModal
        formikInstance={formikCreateFormInstance}
        isModalOpen={isCreateShoppingListModalOpen}
        onModalOpen={onOpenCreateShoppingListModal}
      />
      <SectionHeader
        isShoppingListDetails
        primaryBtnLabel='Delete List'
        secondaryBtnLabel='Copy List'
        title={currentShoppingList?.name ?? ''}
        onGoBack={onGoBack}
        onPrimaryButtonClick={onOpenShoppingListDeleteModal}
        onSecondaryButtonClick={onOpenCreateShoppingListModal}
      />
      <Form onSubmit={onCreateProductItemFormSubmit}>
        <Input
          autoFocus
          endIcon={<AddIcon />}
          inputRef={inputRef}
          placeholder='Add Product'
          onChange={onAddNewProduct}
        />
      </Form>
      {renderCheckbox}
      {renderAvailableShoppingListItems}
      <ProductItemsWidget
        currency={currentShoppingList?.currency ?? Currencies.Dollar}
        shoppingListItems={currentShoppingList?.shoppingListItems ?? []}
      />
    </>
  );
};

export default ShoppingListDetails;
