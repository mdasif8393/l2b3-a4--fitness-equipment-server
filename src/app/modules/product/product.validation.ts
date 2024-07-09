import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string({
    required_error: "name is required",
  }),
  price: z.number({
    required_error: "price is required",
  }),
  stockQuantity: z.number({
    required_error: "stockQuantity is required",
  }),
  description: z.string({
    required_error: "description is required",
  }),
  image: z.string({
    required_error: "image is required",
  }),
  category: z.string({
    required_error: "category is required",
  }),
});

export const updateProductValidationSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  stockQuantity: z.number().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
});
