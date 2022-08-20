import _ from 'lodash';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import history from '../../services/history.service';
import { toastService } from '../../services/toast.service';
import SectionHeader from '../../shared/components/section-header/section-header';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';
import { AddIcon, ClearIcon, Input } from './shopping-list-details.styled';

const ShoppingListDetails = (): ReactElement => {
  const { shoppingListId } = useParams<{ shoppingListId: string }>();

  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);

  const [currentShoppingList, setCurrentShoppingList] = useState<ShoppingList | null>(null);
  const [productItem, setProductItem] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getCurrentShoppingList = _.find(availableShoppingLists, { _id: shoppingListId }) ?? null;

    setCurrentShoppingList(getCurrentShoppingList);
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

  const renderAddOrClearIcon = productItem ? (
    <ClearIcon sx={{ cursor: 'pointer' }} onClick={handleClearInput} />
  ) : (
    <AddIcon />
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
      <Input
        autoFocus
        endIcon={renderAddOrClearIcon}
        inputRef={inputRef}
        placeholder='Add Product'
        onChange={(e) => handleAddNewProduct(e.target.value)}
        onKeyDown={(e) => e.key !== 'Escape' && e.stopPropagation()}
      />
    </>
  );
};

export default ShoppingListDetails;
