import { model, Schema } from "mongoose";

import { ShoppingListItem } from "./../interfaces";
import { ShoppingListDetailsSchema } from "./shoppingListDetailsSchema";

const ShoppingListSchema = new Schema<ShoppingListItem>(
  {
    user: { type: String, ref: "User" },
    name: { type: String, require: true },
    currency: { type: String, require: true },
    shoppingListItems: { type: [ShoppingListDetailsSchema], require: true, default: [] },
  },
  {
    timestamps: true,
  }
);

export const ShoppingList = model<ShoppingListItem>("ShoppingList", ShoppingListSchema);
