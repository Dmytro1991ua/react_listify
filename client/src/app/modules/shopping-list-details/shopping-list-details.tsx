import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import history from '../../services/history.service';
import { toastService } from '../../services/toast.service';
import SectionHeader from '../../shared/components/section-header/section-header';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';

const ShoppingListDetails = (): ReactElement => {
  const { shoppingListId } = useParams<{ shoppingListId: string }>();

  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);

  const [currentShoppingList, setCurrentShoppingList] = useState<ShoppingList | null>(null);

  useEffect(() => {
    const getCurrentShoppingList =
      availableShoppingLists.find((shoppingList) => shoppingList._id === shoppingListId) ?? null;

    setCurrentShoppingList(getCurrentShoppingList);
  }, [availableShoppingLists, shoppingListId]);

  function handleGoBack(): void {
    history.goBack();
  }

  return (
    <SectionHeader
      isShoppingListDetails
      primaryBtnLabel='Delete List'
      secondaryBtnLabel='Copy List'
      title={currentShoppingList?.name ?? ''}
      onGoBack={handleGoBack}
      onPrimaryButtonClick={() => toastService.info('Not Implemented yet: Primary Button')}
      onSecondaryButtonClick={() => toastService.info('Not implemented yet: Secondary Button')}
    />
  );
};

export default ShoppingListDetails;
