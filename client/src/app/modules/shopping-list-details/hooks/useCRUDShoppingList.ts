import { AppRoutes, Currencies } from '../../../app.enums';
import { ShoppingListData, ShoppingListItem } from '../../../app.interfaces';
import history from '../../../services/history.service';
import { createShoppingListAction, deleteShoppingListAction } from '../../shopping-lists/shopping-lists.actions';
import { CreateShoppingListFromInitialValues } from '../../shopping-lists/shopping-lists.interfaces';

type HookProps = {
  currency: Currencies;
  shoppingListItems: ShoppingListItem[];
  shoppingListId: string;
  onCloseModal: () => void;
};

type ReturnedHookType = {
  onCreateShoppingListCopy: (values: CreateShoppingListFromInitialValues) => Promise<void>;
  onShoppingListDeletion: () => Promise<void>;
};

export const useCRUDShoppingList = ({
  currency,
  shoppingListItems,
  shoppingListId,
  onCloseModal,
}: HookProps): ReturnedHookType => {
  async function onCreateShoppingListCopy(values: CreateShoppingListFromInitialValues): Promise<void> {
    try {
      const payload: ShoppingListData = {
        name: values.name,
        currency: currency ?? Currencies.Default,
        shoppingListItems: shoppingListItems ?? [],
      };

      await createShoppingListAction(payload);
      onCloseModal();
      history.push(AppRoutes.ShoppingLists);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function onShoppingListDeletion(): Promise<void> {
    try {
      await deleteShoppingListAction(shoppingListId);

      history.push(AppRoutes.ShoppingLists);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  return { onCreateShoppingListCopy, onShoppingListDeletion };
};
