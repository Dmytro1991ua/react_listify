import { model, Schema } from "mongoose";

import { ShoppingListDetailsItem } from "../../interfaces";
import { CategorySchema } from "../categories/category.schema";

export const ShoppingListDetailsSchema = new Schema<ShoppingListDetailsItem>(
  {
    name: { type: String, require: true },
    category: { type: CategorySchema, require: false },
    quantity: { type: Number, require: true },
    units: { type: String, require: true },
    price: { type: Number, require: true },
    isChecked: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const ShoppingListDetails = model<ShoppingListDetailsItem>("ShoppingListDetails", ShoppingListDetailsSchema);
