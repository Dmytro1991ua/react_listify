import { FormikProps, useFormik } from 'formik';
import _ from 'lodash';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import { AppRoutes } from '../../app.enums';
import { ShoppingListData, ShoppingListItem } from '../../app.interfaces';
import history from '../../services/history.service';
import {
  CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE,
  CREATE_SHOPPING_LIST_FORM_VALIDATION,
} from '../../shared/components/create-shopping-list-modal/create-shopping-list-modal.schema';
import FallbackMessage from '../../shared/components/fallback-message/fallback-message';
import SectionHeader from '../../shared/components/section-header/section-header';
import { sortedItems } from '../../utils';
import { CreateShoppingListFromInitialValues } from '../shopping-lists/shopping-lists.interfaces';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';
import { ItemWrapper } from '../shopping-lists/shopping-lists.styled';
import CreateShoppingListCopyModal from './components/create-shopping-list-copy-modal/create-shopping-list-copy-modal';
import DeleteProductItemModal from './components/delete-product-item-modal/delete-product-item-modal';
import DeleteShoppingListModal from './components/delete-shopping-list-modal/delete-shopping-list-modal';
import ProductItem from './components/product-item/product-item';
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
  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';

  const [currentShoppingList, setCurrentShoppingList] = useState<ShoppingListData | null>(null);
  const [productItem, setProductItem] = useState('');
  const [isProductItemDeleteModalOpen, setIsProductItemDeleteModalOpen] = useState(false);
  const [isShoppingListDeleteModalOpen, setIsShoppingListDeleteModalOpen] = useState(false);
  const [isCreateShoppingListModalOpen, setIsCreateShoppingListModalOpen] = useState(false);
  const [shoppingListItemId, setShoppingListItemId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const formikInstance: FormikProps<CreateShoppingListFromInitialValues> =
    useFormik<CreateShoppingListFromInitialValues>({
      initialValues: CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE(`Copy of ${currentShoppingList?.name}`),
      validationSchema: CREATE_SHOPPING_LIST_FORM_VALIDATION,
      enableReinitialize: true,
      onSubmit: (values, { resetForm }) => {
        handleCreateShoppingListCopy(values);

        resetForm();
      },
    });

  useEffect(() => {
    const getCurrentShoppingList = _.find(availableShoppingLists, { _id: shoppingListId }) ?? null;

    if (getCurrentShoppingList) {
      setCurrentShoppingList(getCurrentShoppingList);
    }
  }, [availableShoppingLists, shoppingListId]);

  const handleAddNewProduct = useMemo(() => _.debounce((value) => setProductItem(value), 300), []);
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
      setProductItem('');
    }
  }

  function handleOpenProductItemDeleteModal(id: string): void {
    setIsProductItemDeleteModalOpen(true);
    setShoppingListItemId(id);
  }

  function handleOpenShoppingListDeleteModal(): void {
    setIsShoppingListDeleteModalOpen(true);
  }

  function handleOpenCreateShoppingListModal(): void {
    setIsCreateShoppingListModalOpen(true);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault();

      const payload: ShoppingListItem = {
        ...shoppingListItem,
        name: productItem,
      };

      if (productItem) {
        await createShoppingListItem(currentShoppingList?._id as string, payload);
      }

      handleClearInput();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function handleCreateShoppingListCopy(values: CreateShoppingListFromInitialValues): Promise<void> {
    try {
      const payload: ShoppingListData = {
        name: values.name,
        currency: currentShoppingList?.currency ?? '',
        shoppingListItems: currentShoppingList?.shoppingListItems ?? [],
      };

      await createShoppingList(payload);
      handleOpenCreateShoppingListModal();
      history.push(AppRoutes.ShoppingLists);
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
                currency={currentShoppingList.currency}
                item={item}
                onDelete={handleOpenProductItemDeleteModal}
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
      <DeleteShoppingListModal
        isModalOpen={isShoppingListDeleteModalOpen}
        shoppingListId={currentShoppingList?._id as string}
        onModalOpen={setIsShoppingListDeleteModalOpen}
      />
      <CreateShoppingListCopyModal
        formikInstance={formikInstance}
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
    </>
  );
};

export default ShoppingListDetails;
