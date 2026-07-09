import { z } from "zod";

const objectIdSchema = z.string()
  .regex(/^[a-fA-F0-9]{24}$/, "Невалідний ідентифікатор");

const orderItemInputSchema = z.object({
  spot: objectIdSchema,
  quantity: z.number().int().min(1).max(20),
});

export const createOrderSchema = z.object({
  user: objectIdSchema.optional(),
  items: z.array(orderItemInputSchema)
    .min(1, "Замовлення має містити хоча б одну позицію")
    .max(20, "Максимум 20 позицій"),
  notes: z.string().max(300).trim().optional().default(""),
});

export const updateOrderSchema = z.object({
  status: z.enum(["pending","preparing","ready","completed","cancelled"]).optional(),
  notes: z.string().max(300).trim().optional(),
}).refine((d) => Object.keys(d).length > 0, {
  message: "Немає даних для оновлення",
});

export const userUpdateOrderSchema = z.object({
  status: z.literal("cancelled"),
});