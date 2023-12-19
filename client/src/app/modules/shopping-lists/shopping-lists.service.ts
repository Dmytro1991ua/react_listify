import {
  FAILED_CREATE_SHOPPING_LIST,
  FAILED_DELETE_SHOPPING_LIST,
  FAILED_LOAD_SHOPPING_LISTS_MESSAGE,
  FAILED_TO_ADD_SHOPPING_LIST_TO_FAVORITES,
  FAILED_UPDATE_SHOPPING_LIST,
  SHOPPING_LIST_SUCCESS_ADD_TO_FAVORITE_MESSAGE,
  SUCCESSFUL_CREATE_SHOPPING_LIST,
  SUCCESSFUL_DELETE_SHOPPING_LIST,
  SUCCESSFUL_UPDATED_SHOPPING_LIST,
} from './shopping-lists.contants';
import { UpdateShoppingListPayload } from './shopping-lists.interfaces';
import { ShoppingListData } from '../../app.interfaces';
import { AXIOS_CONFIG } from '../../configs/axios';
import { toastService } from '../../services/toast.service';

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

  async addShoppingListToFavorites(id: string): Promise<ShoppingListData | null> {
    try {
      const response = await AXIOS_CONFIG.put(`/api/shopping-lists/${id}/add-to-favorites`, {});

      if (!response.data) {
        return null;
      }

      toastService.success(SHOPPING_LIST_SUCCESS_ADD_TO_FAVORITE_MESSAGE);

      return response.data;
    } catch (error) {
      toastService.error(FAILED_TO_ADD_SHOPPING_LIST_TO_FAVORITES);
      throw new Error((error as Error).message);
    }
  }

  async selectAllShoppingLists(): Promise<ShoppingListData[] | null> {
    try {
      const response = await AXIOS_CONFIG.put('/api/shopping-lists/select-all-shopping-lists', {});

      if (!response.data) {
        return null;
      }

      toastService.success(response.data.message);

      const { data } = response.data;

      return data;
    } catch (error) {
      toastService.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }

  async deleteAllShoppingLists(): Promise<ShoppingListData[] | null> {
    try {
      const response = await AXIOS_CONFIG.put('/api/shopping-lists/delete-all-shopping-lists', {});

      if (!response.data) {
        return null;
      }

      toastService.success(response.data.message);

      const { data } = response.data;

      return data;
    } catch (error) {
      toastService.error((error as Error).message);
      throw new Error((error as Error).message);
    }
  }
}

export const shoppingListsService = new ShoppingListsService();
