import {
  FAILED_DELETE_SHOPPING_LIST_ITEM,
  SUCCESSFUL_DELETE_SHOPPING_LIST_ITEM,
} from './shopping-list-details.constants';
import { ShoppingListData, ShoppingListItem, UpdateShoppingListItemServicePayload } from '../../app.interfaces';
import { AXIOS_CONFIG } from '../../configs/axios';
import { toastService } from '../../services/toast.service';

class ShoppingListDetailsService {
  async updateShoppingListItem(payload: UpdateShoppingListItemServicePayload): Promise<ShoppingListData | null> {
    const { shoppingListItem, url, successMessage, failedMessage } = payload;
    try {
      const response = await AXIOS_CONFIG.put(url, shoppingListItem);

      if (!response.data) {
        return null;
      }

      successMessage && toastService.success(successMessage);
      return response.data;
    } catch (error) {
      failedMessage && toastService.error(failedMessage);
      throw new Error((error as Error).message);
    }
  }

  async deleteShoppingListItem(id: string, productItemId: string): Promise<ShoppingListData | null> {
    try {
      const response = await AXIOS_CONFIG.delete(`/api/shopping-lists/${id}/delete-product-item`, {
        data: {
          id: productItemId,
        },
      });

      if (!response.data) {
        return null;
      }

      toastService.success(SUCCESSFUL_DELETE_SHOPPING_LIST_ITEM);
      return response.data;
    } catch (error) {
      toastService.error(FAILED_DELETE_SHOPPING_LIST_ITEM);
      throw new Error((error as Error).message);
    }
  }

  async selectAllShoppingListItems(
    id: string,
    shoppingListItems: ShoppingListItem[]
  ): Promise<ShoppingListData | null> {
    try {
      const response = await AXIOS_CONFIG.put(`/api/shopping-lists/${id}/select-all-product-items`, shoppingListItems);

      if (!response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteAllSelectedShoppingListItems(id: string): Promise<ShoppingListData | null> {
    try {
      const response = await AXIOS_CONFIG.put(`/api/shopping-lists/${id}/delete-all-product-items`, {});

      if (!response.data) {
        return null;
      }

      toastService.success(response.data.message);

      return response.data.data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const shoppingListDetailsService = new ShoppingListDetailsService();
