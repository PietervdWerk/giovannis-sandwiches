import { z } from 'zod'
import OrderModel from '../../../models/order'
import dbConnect from '../../utils/mongodb'

import { router, publicProcedure } from '../trpc'

export const orderRouter = router({
  create: publicProcedure
    .input(z.object({ recipient: z.string(), amount: z.number() }))
    .mutation(async ({ input }) => {
      await dbConnect()
      const Order = OrderModel

      const newOrder = new Order({
        recipient: input.recipient,
        createdAt: new Date().toISOString(),
        amount: input.amount,
      })

      await newOrder.save()

      return {
        order: newOrder,
      }
    }),
  getAll: publicProcedure.query(async () => {
    await dbConnect()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 2349
    const orders = await OrderModel.find({})

    return {
      orders,
    }
  }),
})
