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
  areAllProductItemsChecked,
  calculateByQuantity,
  calculateProductItemPrice,
  calculateProductItemsByCheckedSate,
  calculateTotalPrice,
  sortedDropdownItems,
  sortedItems,
  toBuyOrPurchasedLabel,
  toggleAllProductItems,
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

describe('areAllProductItemsChecked', () => {
  it('should return true if all shopping list items are checked within the list', () => {
    expect(areAllProductItemsChecked(defaultCheckedShoppingListItems)).toEqual(true);
  });

  it('should return false if not all shopping list items are checked within the list', () => {
    expect(areAllProductItemsChecked(defaultShoppingListItems)).toEqual(false);
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
