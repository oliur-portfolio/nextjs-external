import { Schema, models, model } from "mongoose";

export type TProductSchemaStatus = "active" | "inactive";

export interface IProductSchema {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  status: TProductSchemaStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProductSchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Product =
  models.Product || model<IProductSchema>("Product", productSchema);
