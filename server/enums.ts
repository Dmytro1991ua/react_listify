export enum Currencies {
  Dollar = "$",
  Euro = "€",
  Pound = "£",
  Hryvna = "₴",
  Zloty = "zł",
  Ruble = "₽",
  JapaneseYen = "¥",
  SwissFranc = "₣",
  CanadianDollar = "CA$",
}

export enum Routes {
  usersRoute = "/api/users",
  shoppingListsRoute = "/api/shopping-lists",
  getUser = "/me",
  rootRoute = "/",
  deleteShoppingList = "/:id",
  updateUserProfile = "/profile",
  createProductItem = "/:id/create-product-item",
  deleteProductItem = "/:id/delete-product-item",
  selectProductItem = "/:id/select-product-item",
  editProductItem = "/:id/edit-product-item",
  selectAllProductItems = "/:id/select-all-product-items",
  editShoppingList = "/:id/edit-shopping-list",
  addToFavorites = "/:id/add-to-favorites"
}
