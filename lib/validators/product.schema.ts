import { z } from "zod";

// Product Base Schema
const productBaseSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters."),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "inactive"]),
});

// Product Frontend Schema
export const productFormSchema = productBaseSchema.extend({
  price: z
    .string()
    .min(1, "Price is required")
    .transform(Number)
    .pipe(z.number().positive("Price must be greater than 0")),
  stock: z
    .string()
    .transform((value) => (value.trim() === "" ? 0 : Number(value)))
    .pipe(
      z
        .number()
        .int("Stock must be a whole number")
        .min(0, "Stock must be 0 or more")
    ),
});

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormOutput = z.output<typeof productFormSchema>;

// Product Frontend Schema
export const productApiSchema = productBaseSchema.extend({
  price: z
    .number()
    .min(1, "Price is required")
    .positive("Price must be greater than 0"),
  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock must be 0 or more"),
});

export type ProductApiInput = z.input<typeof productApiSchema>;
export type ProductApiOutput = z.output<typeof productApiSchema>;
