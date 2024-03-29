import {
  defaultCheckedShoppingListItems,
  defaultShoppingListItems,
  defaultShoppingLists,
  defaultSortedDropdownItems,
  defaultSortedShoppingLists,
  expectedDropdownItemsSortingResult,
  expectedShoppingListsSortingResult,
} from './mocks/test-mocks';
import {
  areAllItemsChecked,
  areSomeItemsChecked,
  calculateByQuantity,
  calculateProductItemPrice,
  calculateProductItemsByCheckedSate,
  calculateTotalPrice,
  getCurrentShoppingList,
  sortedDropdownItems,
  sortedItems,
  toBuyOrPurchasedLabel,
  toggleAllProductItems,
  toggleIsCheckedPropertyById,
} from './utils';

describe('sortedItems', () => {
  it('should return correct list of shopping lists items, sorting by name and isChecked properties', () => {
    expect(sortedItems(defaultShoppingListItems, 'isChecked')).toEqual(expectedShoppingListsSortingResult);
  });

  it('should return correct list of shopping lists, sorting by name and isFavorite properties', () => {
    expect(sortedItems(defaultShoppingLists, 'isFavorite')).toEqual(defaultSortedShoppingLists);
  });
});

describe('sortedDropdownItems', () => {
  it('should return correct dropdown items sorting by name', () => {
    expect(sortedDropdownItems(defaultSortedDropdownItems)).toEqual(expectedDropdownItemsSortingResult);
  });
});

describe('calculateProductItemPrice', () => {
  it('should return correct calculated price of specific product item', () => {
    expect(calculateProductItemPrice(2, 10)).toEqual(20);
  });
});

describe('calculateByQuantity', () => {
  it('should return correct calculated price of specific product item by quantity based on user preferences', () => {
    expect(calculateByQuantity(2, 10, true)).toEqual(20);
  });

  it('should return correct calculated regular price of specific product item by quantity', () => {
    expect(calculateByQuantity(10, 2, false)).toEqual(10);
  });
});

describe('calculateTotalPrice', () => {
  it('should return correct calculated total price of all product item based on user preferences', () => {
    expect(calculateTotalPrice(defaultShoppingListItems, true)).toEqual(55.5);
  });

  it('should return correct calculated regular total price of all product items', () => {
    expect(calculateTotalPrice(defaultShoppingListItems, false)).toEqual(25);
  });
});

describe('calculateProductItemsByCheckedSate', () => {
  it('should return correct calculated total To Buy or Purchased values based on based on passed true boolean flag and user preferences', () => {
    expect(calculateProductItemsByCheckedSate(defaultShoppingListItems, true, true)).toEqual(15.5);
  });

  it('should return correct calculated regular total To Buy or Purchased values based on based on passed false boolean flag', () => {
    expect(calculateProductItemsByCheckedSate(defaultShoppingListItems, false, false)).toEqual(16);
  });
});

describe('areAllItemsChecked', () => {
  it('should return true if all shopping list items are checked within the list', () => {
    expect(areAllItemsChecked(defaultCheckedShoppingListItems)).toEqual(true);
  });

  it('should return false if not all shopping list items are checked within the list', () => {
    expect(areAllItemsChecked(defaultShoppingListItems)).toEqual(false);
  });
});

describe('areSomeItemsChecked', () => {
  it('returns true if at least one item is checked', () => {
    const items = [{ isChecked: false }, { isChecked: true }, { isChecked: false }];

    const result = areSomeItemsChecked(items);

    expect(result).toBe(true);
  });

  it('returns false if no items are checked', () => {
    const items = [{ isChecked: false }, { isChecked: false }, { isChecked: false }];

    const result = areSomeItemsChecked(items);

    expect(result).toBe(false);
  });
});

describe('toggleAllProductItems', () => {
  it('should return all checked (toggled) shopping list items within the list', () => {
    expect(toggleAllProductItems(defaultCheckedShoppingListItems, true)).toEqual(defaultCheckedShoppingListItems);
  });
});

describe('toBuyOrPurchasedLabel', () => {
  it('should return correct To Buy label based on isChecked property while boolean property is false', () => {
    expect(toBuyOrPurchasedLabel(defaultShoppingListItems, false)).toEqual(3);
  });

  it('should return correct Purchased label based on isChecked property while boolean property is true', () => {
    expect(toBuyOrPurchasedLabel(defaultShoppingListItems, true)).toEqual(2);
  });
});

describe('getCurrentShoppingList', () => {
  it('should return a current shopping list byt its id', () => {
    const result = getCurrentShoppingList(defaultShoppingLists, '2');

    expect(result).toEqual(defaultShoppingLists[1]);
  });
});

describe('toggleIsCheckedPropertyById', () => {
  it('should toggle isChecked property of the item with the provided id', () => {
    const idToToggle = '1';
    const updatedShoppingList = toggleIsCheckedPropertyById(defaultShoppingLists, idToToggle);

    expect(updatedShoppingList).toEqual({ ...defaultShoppingLists[0], isChecked: true });
  });
});
