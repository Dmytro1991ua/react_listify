import { UserRequest } from "../interfaces";
import { ShoppingListDetails } from "../models/shoppingListDetailsSchema";
import { Response } from "express";
import { ShoppingList } from "./../models/shoppingListSchema";

// @dec Create a new shopping list details item(product)
// @route  PUT /api/shopping-lists/:id/product-item
// @access Private
export const createShoppingListDetailsItem = async (req: UserRequest, res: Response) => {
  const { id: _id } = req.params;
  const shoppingListDetailsItem = req.body;

  const user = req.currentUser;

  try {
    if (user) {
      const newShoppingListDetailsItem = new ShoppingListDetails({ ...shoppingListDetailsItem, user: user.uid });

      const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
        { _id },
        { $addToSet: { shoppingListItems: newShoppingListDetailsItem } },
        { new: true }
      );

      res.status(200).json(updatedShoppingList);
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    res.status(409);
    throw new Error((err as Error).message);
  }
};

// @dec Delete specific shopping list details item(product)
// @route  DELETE /api/shopping-lists/:id/delete-product-item
// @access Private
export const deleteShoppingListDetailsItem = async (req: UserRequest, res: Response) => {
  const { id: _id } = req.params;
  const { id } = req.body;

  const user = req.currentUser;

  try {
    if (user) {
      const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
        { _id },
        { $pull: { shoppingListItems: { _id: id } } },
        { new: true }
      );

      res.status(200).json(updatedShoppingList);
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    res.status(409);
    throw new Error((err as Error).message);
  }
};

// @dec Select (marked as checked) specific shopping list details item(product)
// @route  PUT /api/shopping-lists/:id/select-product-item
// @access Private
export const selectShoppingListDetailsItem = async (req: UserRequest, res: Response) => {
  const { id: _id } = req.params;
  const { _id: productItemId, isChecked } = req.body;

  const user = req.currentUser;

  try {
    if (user) {
      const updatedShoppingList = await ShoppingList.findOneAndUpdate(
        { _id, "shoppingListItems._id": productItemId },
        { $set: { "shoppingListItems.$.isChecked": !isChecked } },
        { new: true }
      );

      res.status(200).json(updatedShoppingList);
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    res.status(409);
    throw new Error((err as Error).message);
  }
};

// @dec Edit specific shopping list details item(product)
// @route  PUT /api/shopping-lists/:id/edit-product-item
// @access Private
export const editShoppingListDetailsItem = async (req: UserRequest, res: Response) => {
  const { id: _id } = req.params;
  const { _id: productItemId, name, quantity, units, price } = req.body;

  const user = req.currentUser;

  try {
    if (user) {
      const updatedShoppingList = await ShoppingList.findOneAndUpdate(
        { _id, "shoppingListItems._id": productItemId },
        {
          $set: {
            "shoppingListItems.$.name": name,
            "shoppingListItems.$.quantity": quantity,
            "shoppingListItems.$.units": units,
            "shoppingListItems.$.price": price,
          },
        },
        { new: true }
      );

      res.status(200).json(updatedShoppingList);
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    res.status(409);
    throw new Error((err as Error).message);
  }
};

// @dec Select (marked as checked) all shopping list details items(products)
// @route  PUT /api/shopping-lists/:id/select-all-product-items
// @access Private
export const selectAllShoppingListDetailsItems = async (req: UserRequest, res: Response) => {
  const { id: _id } = req.params;
  const items = req.body;

  const user = req.currentUser;

  try {
    if (user) {
      const updatedShoppingList = await ShoppingList.findOneAndUpdate(
        { _id },
        { $set: { shoppingListItems: items } },
        { new: true, multi: true }
      );

      res.status(200).json(updatedShoppingList);
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    res.status(409);
    throw new Error((err as Error).message);
  }
};
