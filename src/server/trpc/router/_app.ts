import { router } from '../trpc'
import { orderRouter } from './order'

export const appRouter = router({
  order: orderRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
