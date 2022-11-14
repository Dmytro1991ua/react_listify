import { Response } from "express";

import { UserRequest } from "../../interfaces";
import { ShoppingList } from "../shopping-lists/shopping-list.schema";
import { ShoppingListDetails } from "./shopping-list-details.schema";

export class ShoppingListDetailsService {
  // @dec Create a new shopping list details item(product)
  // @route  PUT /api/shopping-lists/:id/create-product-item
  // @access Private
  async createShoppingListDetailsItem(req: UserRequest, res: Response): Promise<void> {
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
  }

  // @dec Delete specific shopping list details item (product)
  // @route  DELETE /api/shopping-lists/:id/delete-product-item
  // @access Private
  async deleteShoppingListDetailsItem(req: UserRequest, res: Response): Promise<void> {
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
  }

  // @dec Select (marked as checked) specific shopping list details item(product)
  // @route  PUT /api/shopping-lists/:id/select-product-item
  // @access Private
  async selectShoppingListDetailsItem(req: UserRequest, res: Response): Promise<void> {
    const { id: _id } = req.params;
    const { _id: productItemId, isChecked } = req.body;

    const user = req.currentUser;

    try {
      if (user) {
        const updatedShoppingList = await ShoppingList.findOneAndUpdate(
          { _id, "shoppingListItems._id": productItemId },
          { $set: { "shoppingListItems.$.isChecked": isChecked } },
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
  }

  // @dec Edit specific shopping list details item (product)
  // @route  PUT /api/shopping-lists/:id/edit-product-item
  // @access Private
  async editShoppingListDetailsItem(req: UserRequest, res: Response): Promise<void> {
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
  }

  // @dec Select (marked as checked) all shopping list details items (products)
  // @route  PUT /api/shopping-lists/:id/select-all-product-items
  // @access Private
  async selectAllShoppingListDetailsItems(req: UserRequest, res: Response): Promise<void> {
    const { id: _id } = req.params;
    const items = req.body;

    console.log(items);

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
  }
}
