import { FormikProps, useFormik } from 'formik';
import _ from 'lodash';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import { AppRoutes, Currencies, ProductUnits } from '../../app.enums';
import { ShoppingListData, ShoppingListItem } from '../../app.interfaces';
import history from '../../services/history.service';
import {
  CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
  CREATE_SHOPPING_LIST_FORM_VALIDATION,
} from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal.schema';
import FallbackMessage from '../../shared/components/fallback-message/fallback-message';
import SectionHeader from '../../shared/components/section-header/section-header';
import { availableProductUnits, sortedDropdownItems, sortedItems } from '../../utils';
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
import {
  SHOPPING_LISTS_DETAILS_FALLBACK_MESSAGE_SUBTITLE,
  SHOPPING_LISTS_DETAILS_FALLBACK_MESSAGE_TITLE,
} from './shopping-list-details.constants';
import { AddIcon, Form, Input } from './shopping-list-details.styled';

const ShoppingListDetails = (): ReactElement => {
  const { shoppingListId } = useParams<{ shoppingListId: string }>();

  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);
  const shoppingListItem = useShoppingListsStore((state) => state.shoppingListItem);
  const createShoppingListItem = useShoppingListsStore((state) => state.createNewShoppingListItem);
  const createShoppingList = useShoppingListsStore((state) => state.createNewShoppingList);
  const selectShoppingListItem = useShoppingListsStore((state) => state.selectShoppingListItem);
  const editShoppingListItem = useShoppingListsStore((state) => state.editShoppingListItem);
  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';
  const user = useAuthStore((state) => state.user);

  const [currentShoppingList, setCurrentShoppingList] = useState<ShoppingListData | null>(null);
  const [newProductItem, setNewProductItem] = useState('');

  const [isProductItemDeleteModalOpen, setIsProductItemDeleteModalOpen] = useState<boolean>(false);
  const [isShoppingListDeleteModalOpen, setIsShoppingListDeleteModalOpen] = useState<boolean>(false);
  const [isCreateShoppingListModalOpen, setIsCreateShoppingListModalOpen] = useState<boolean>(false);
  const [isProductItemEditModalOpen, setIsProductItemEditModalOpen] = useState<boolean>(false);

  const [shoppingListItemId, setShoppingListItemId] = useState<string>('');
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentProductItem = _.find(currentShoppingList?.shoppingListItems, { _id: shoppingListItemId }) ?? null;

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

  useEffect(() => {
    const getCurrentShoppingList = _.find(availableShoppingLists, { _id: shoppingListId }) ?? null;

    if (getCurrentShoppingList) {
      setCurrentShoppingList(getCurrentShoppingList);
    }
  }, [availableShoppingLists, shoppingListId]);

  const handleAddNewProduct = useMemo(() => _.debounce((value) => setNewProductItem(value), 300), []);
  const sortedAvailableProductUnits = sortedDropdownItems(availableProductUnits);
  const sortedItemsByNameOrSelectedState = useMemo(
    () => sortedItems(currentShoppingList?.shoppingListItems ?? []),
    [currentShoppingList?.shoppingListItems]
  );

  function handleGoBack(): void {
    history.goBack();
  }

  function handleClearInput(): void {
    if (inputRef.current) {
      inputRef.current.value = '';
      setNewProductItem('');
    }
  }

  function handleOpenProductItemDeleteModal(id: string): void {
    setIsProductItemDeleteModalOpen(true);
    setShoppingListItemId(id);
  }

  function handleOpenProductItemEditModal(id: string): void {
    setIsProductItemEditModalOpen(true);
    setShoppingListItemId(id);
  }

  function handleOpenShoppingListDeleteModal(): void {
    setIsShoppingListDeleteModalOpen(true);
  }

  function handleOpenCreateShoppingListModal(): void {
    setIsCreateShoppingListModalOpen(true);
  }

  function handleCloseProductItemEditModal(): void {
    setIsProductItemEditModalOpen(false);
    setValidateAfterSubmit(false);
  }

  function handleEditProductItem(): void {
    setValidateAfterSubmit(true);
    formikEditFormInstance.submitForm();
  }

  async function handleCreateShoppingListCopy(values: CreateShoppingListFromInitialValues): Promise<void> {
    try {
      const payload: ShoppingListData = {
        name: values.name,
        currency: currentShoppingList?.currency ?? Currencies.Default,
        shoppingListItems: currentShoppingList?.shoppingListItems ?? [],
      };

      await createShoppingList(payload);
      handleOpenCreateShoppingListModal();
      history.push(AppRoutes.ShoppingLists);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function handleProductItemSelection(id: string): Promise<void> {
    try {
      const selectedProductItem = _.find(currentShoppingList?.shoppingListItems, { _id: id }) ?? null;
      await selectShoppingListItem(currentShoppingList?._id as string, selectedProductItem);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault();

      const payload: ShoppingListItem = {
        ...shoppingListItem,
        name: newProductItem,
      };

      if (newProductItem) {
        await createShoppingListItem(currentShoppingList?._id as string, payload);
      }

      handleClearInput();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function handleEditProductItemFormSubmit(values: EditProductItemFormInitialValues): Promise<void> {
    try {
      setValidateAfterSubmit(true);

      const editedProductItem =
        currentShoppingList?.shoppingListItems.find((item) => item._id === shoppingListItemId) ?? null;

      const payload: ShoppingListItem = {
        ...editedProductItem,
        name: values.name,
        quantity: Number(values.quantity) ?? 0,
        units: values.unit ? values.unit : ProductUnits.Default,
        price: Number(values.price) ?? 0,
      };

      await editShoppingListItem(currentShoppingList?._id as string, payload);
      handleCloseProductItemEditModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
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
                onClick={handleProductItemSelection}
                onDelete={handleOpenProductItemDeleteModal}
                onEdit={handleOpenProductItemEditModal}
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

  return (
    <>
      <DeleteProductItemModal
        isModalOpen={isProductItemDeleteModalOpen}
        shoppingListId={currentShoppingList?._id as string}
        shoppingListItemId={shoppingListItemId}
        onModalOpen={setIsProductItemDeleteModalOpen}
      />
      <EditProductItemModal
        formikInstance={formikEditFormInstance}
        open={isProductItemEditModalOpen}
        options={sortedAvailableProductUnits}
        primaryBtnLabel='Change'
        title='Edit Product Item'
        onClose={handleCloseProductItemEditModal}
        onSubmit={handleEditProductItem}
      />
      <DeleteShoppingListModal
        isModalOpen={isShoppingListDeleteModalOpen}
        shoppingListId={currentShoppingList?._id as string}
        onModalOpen={setIsShoppingListDeleteModalOpen}
      />
      <CreateShoppingListCopyModal
        formikInstance={formikCreateFormInstance}
        isModalOpen={isCreateShoppingListModalOpen}
        onModalOpen={setIsCreateShoppingListModalOpen}
      />
      <SectionHeader
        isShoppingListDetails
        primaryBtnLabel='Delete List'
        secondaryBtnLabel='Copy List'
        title={currentShoppingList?.name ?? ''}
        onGoBack={handleGoBack}
        onPrimaryButtonClick={handleOpenShoppingListDeleteModal}
        onSecondaryButtonClick={handleOpenCreateShoppingListModal}
      />
      <Form onSubmit={handleFormSubmit}>
        <Input
          autoFocus
          endIcon={<AddIcon />}
          inputRef={inputRef}
          placeholder='Add Product'
          onChange={(e) => handleAddNewProduct(e.target.value)}
        />
      </Form>
      {renderAvailableShoppingListItems}
      <ProductItemsWidget currency={currentShoppingList?.currency ?? Currencies.Dollar} />
    </>
  );
};

export default ShoppingListDetails;
