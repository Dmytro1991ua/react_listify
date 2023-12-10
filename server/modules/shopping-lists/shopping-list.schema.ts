import { model, Schema } from "mongoose";

import { ShoppingListItem } from "../../interfaces";
import { ShoppingListDetailsSchema } from "../shopping-list-details/shopping-list-details.schema";

const ShoppingListSchema = new Schema<ShoppingListItem>(
  {
    user: { type: String, ref: "User" },
    name: { type: String, require: true },
    currency: { type: String, require: true },
    shoppingListItems: {
      type: [ShoppingListDetailsSchema],
      require: true,
      default: [],
    },
    isFavorite: { type: Boolean, default: false },
    isChecked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const ShoppingList = model<ShoppingListItem>(
  "ShoppingList",
  ShoppingListSchema
);
