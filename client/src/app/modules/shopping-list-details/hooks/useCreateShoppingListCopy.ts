import { AppRoutes, Currencies } from '../../../app.enums';
import { ShoppingListData, ShoppingListItem } from '../../../app.interfaces';
import history from '../../../services/history.service';
import { createShoppingListAction } from '../../shopping-lists/shopping-lists.actions';
import { CreateShoppingListFromInitialValues } from '../../shopping-lists/shopping-lists.interfaces';

type HookProps = {
  currency: Currencies;
  shoppingListItems: ShoppingListItem[];
  onCloseModal: () => void;
};

type ReturnedHookType = {
  onCreateShoppingListCopy: (values: CreateShoppingListFromInitialValues) => Promise<void>;
};

export const useCreateShoppingListCopy = ({
  currency,
  shoppingListItems,
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

  return { onCreateShoppingListCopy };
};
