import { models, model, Schema } from "mongoose";
import type { IOrder } from "../types/order";

const OrderSchema = new Schema<IOrder>({
  recipient: { type: String, required: true },
  createdAt: { type: String, required: true },
  amount: { type: Number, required: true },
});

const OrderModel = models.Order || model("Order", OrderSchema);

export default OrderModel;
