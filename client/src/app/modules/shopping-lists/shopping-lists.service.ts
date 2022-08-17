import { AXIOS_CONFIG } from '../../configs/axios';
import { toastService } from '../../services/toast.service';
import {
  FAILED_CREATE_SHOPPING_LIST,
  FAILED_DELETE_SHOPPING_LIST,
  FAILED_LOAD_SHOPPING_LISTS_MESSAGE,
  SUCCESSFUL_CREATE_SHOPPING_LIST,
  SUCCESSFUL_DELETE_SHOPPING_LIST,
} from './shopping-lists.contants';

class ShoppingListsService {
  async getAvailableShoppingLists(): Promise<ShoppingList[]> {
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

  async createShoppingList(shoppingList: ShoppingList): Promise<ShoppingList | null> {
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
}

export const shoppingListsService = new ShoppingListsService();
