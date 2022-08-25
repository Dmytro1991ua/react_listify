import _ from 'lodash';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import history from '../../services/history.service';
import { toastService } from '../../services/toast.service';
import FallbackMessage from '../../shared/components/fallback-message/fallback-message';
import SectionHeader from '../../shared/components/section-header/section-header';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';
import { ItemWrapper } from '../shopping-lists/shopping-lists.styled';
import ProductItem from './component/product-item';
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
  const removeExistingShoppingListItem = useShoppingListsStore((state) => state.removeShoppingListItem);
  const isLoading = useShoppingListsStore((state) => state.shoppingListsLoadingStatus) === 'loading';

  const [currentShoppingList, setCurrentShoppingList] = useState<ShoppingList | null>(null);
  const [productItem, setProductItem] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getCurrentShoppingList = _.find(availableShoppingLists, { _id: shoppingListId }) ?? null;

    if (getCurrentShoppingList) {
      setCurrentShoppingList(getCurrentShoppingList);
    }
  }, [availableShoppingLists, shoppingListId]);

  const handleAddNewProduct = useMemo(() => _.debounce((value) => setProductItem(value), 500), []);

  function handleGoBack(): void {
    history.goBack();
  }

  function handleClearInput(): void {
    if (inputRef.current) {
      inputRef.current.value = '';
      setProductItem('');
    }
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

  async function handleShoppingListItemDeletion(productItemId: string): Promise<void> {
    try {
      await removeExistingShoppingListItem(currentShoppingList?._id as string, productItemId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  const renderFallbackMessageOrShoppingListDetails = (
    <>
      {!currentShoppingList?.shoppingListItems.length ? (
        <ItemWrapper>
          <FallbackMessage
            subtitle={SHOPPING_LISTS_DETAILS_FALLBACK_MESSAGE_SUBTITLE}
            title={SHOPPING_LISTS_DETAILS_FALLBACK_MESSAGE_TITLE}
          />
        </ItemWrapper>
      ) : (
        <>
          {currentShoppingList?.shoppingListItems.map((item) => (
            <ProductItem
              key={item._id}
              currency={currentShoppingList.currency}
              item={item}
              onDelete={handleShoppingListItemDeletion}
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
      <SectionHeader
        isShoppingListDetails
        primaryBtnLabel='Delete List'
        secondaryBtnLabel='Copy List'
        title={currentShoppingList?.name ?? ''}
        onGoBack={handleGoBack}
        onPrimaryButtonClick={() => toastService.info('Not Implemented yet: Primary Button')}
        onSecondaryButtonClick={() => toastService.info('Not implemented yet: Secondary Button')}
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
