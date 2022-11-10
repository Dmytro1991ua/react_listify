import { model, Schema } from "mongoose";

import { CategoryItem } from "./../interfaces";

export const CategorySchema = new Schema<CategoryItem>(
  {
    iconName: { type: String },
    isCustom: { type: Boolean },
    label: { type: String },
    value: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Category = model<CategoryItem>("Category", CategorySchema);
