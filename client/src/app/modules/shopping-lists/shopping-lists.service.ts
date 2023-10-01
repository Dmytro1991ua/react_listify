import { ShoppingListData } from '../../app.interfaces';
import { AXIOS_CONFIG } from '../../configs/axios';
import { toastService } from '../../services/toast.service';
import {
  FAILED_CREATE_SHOPPING_LIST,
  FAILED_DELETE_SHOPPING_LIST,
  FAILED_LOAD_SHOPPING_LISTS_MESSAGE,
  FAILED_UPDATE_SHOPPING_LIST,
  SUCCESSFUL_CREATE_SHOPPING_LIST,
  SUCCESSFUL_DELETE_SHOPPING_LIST,
  SUCCESSFUL_UPDATED_SHOPPING_LIST,
} from './shopping-lists.contants';
import { UpdateShoppingListPayload } from './shopping-lists.interfaces';

class ShoppingListsService {
  async getAvailableShoppingLists(): Promise<ShoppingListData[]> {
    try {
      const response = await AXIOS_CONFIG.get('/api/shopping-lists');

      if (!response.data) {
        return [];
      }

      return response.data;
    } catch (err) {
      toastService.error(FAILED_LOAD_SHOPPING_LISTS_MESSAGE);
      throw new Error((err as Error).message);
    }
  }

  async createShoppingList(shoppingList: ShoppingListData): Promise<ShoppingListData | null> {
    try {
      const response = await AXIOS_CONFIG.post('/api/shopping-lists', shoppingList);

      if (!response.data) {
        return null;
      }

      toastService.success(SUCCESSFUL_CREATE_SHOPPING_LIST);
      return response.data;
    } catch (err) {
      toastService.error(FAILED_CREATE_SHOPPING_LIST);
      throw new Error((err as Error).message);
    }
  }

  async deleteShoppingList(id: string): Promise<string | null> {
    try {
      const response = await AXIOS_CONFIG.delete(`${'/api/shopping-lists'}/${id}`);

      if (!response.data) {
        return null;
      }

      toastService.success(SUCCESSFUL_DELETE_SHOPPING_LIST);
      return response.data;
    } catch (err) {
      toastService.success(FAILED_DELETE_SHOPPING_LIST);
      throw new Error((err as Error).message);
    }
  }

  async updateShoppingList(payload: UpdateShoppingListPayload): Promise<ShoppingListData | null> {
    const { shoppingListData, shoppingListId } = payload;

    try {
      const response = await AXIOS_CONFIG.put(`/api/shopping-lists/${shoppingListId}/edit-shopping-list`, {
        ...shoppingListData,
      });

      if (!response.data) {
        return null;
      }

      toastService.success(SUCCESSFUL_UPDATED_SHOPPING_LIST);

      return response.data;
    } catch (error) {
      toastService.error(FAILED_UPDATE_SHOPPING_LIST);
      throw new Error((error as Error).message);
    }
  }
}

export const shoppingListsService = new ShoppingListsService();
