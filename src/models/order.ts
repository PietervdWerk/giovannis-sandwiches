import type { Model } from 'mongoose';
import { models, model, Schema } from 'mongoose'
import type { Order } from '../types/order'

const OrderSchema = new Schema<Order>({
  recipient: { type: String, required: true },
  createdAt: { type: String, required: true },
})

const OrderModel = models.Order as Model<Order> || model('Order', OrderSchema)

export default OrderModel
