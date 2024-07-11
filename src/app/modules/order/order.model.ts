import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  address: { type: String, required: true },
  products: { type: Array, required: true },
});

export const Order = model<TOrder>("order", orderSchema);
