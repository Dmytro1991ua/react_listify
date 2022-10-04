import _ from 'lodash';

import { ShoppingListItem } from '../../../app.interfaces';
import { selectShoppingListItemAction } from '../shopping-list-details.actions';

type HookProps = {
  shoppingListId: string;
  shoppingListItems: ShoppingListItem[];
};

type ReturnedHookType = {
  onSelectProductItem: (id: string) => Promise<void>;
};

export const useSelectProductItem = ({ shoppingListId, shoppingListItems }: HookProps): ReturnedHookType => {
  async function onSelectProductItem(id: string): Promise<void> {
    try {
      const selectedProductItem = _.find(shoppingListItems, { _id: id }) ?? null;
      await selectShoppingListItemAction(shoppingListId, selectedProductItem);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  return { onSelectProductItem };
};
