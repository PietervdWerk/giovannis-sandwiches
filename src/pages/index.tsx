import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { createSchedule, formatSeconds } from '../utils/schedule'

import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const [recipient, setRecipient] = useState<string>('')
  const orders = trpc.order.getAll.useQuery()

  const { mutateAsync } = trpc.order.create.useMutation({
    onSuccess: () => {
      orders.refetch()
    },
  })

  return (
    <>
      <Head>
        <title>Giovanni&apos;s Sandwiches</title>
        <meta name="description" content="Best sandwiches in town!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="my-10 flex w-screen justify-center text-center text-4xl">
        Giovanni&apos;s Sandwiches
      </h1>
      <main className="px-10 flex h-screen w-screen flex-col md:flex-row gap-10">
        <p className="flex flex-col md:flex-1">
          <label className="mb-2" htmlFor="recipient">
            Recipient
          </label>
          <input
            className="rounded border-b-2 border-blue-500 bg-blue-100 p-1 focus:border-2"
            id="recipient"
            type="text"
            onChange={(e) => setRecipient(e.currentTarget.value)}
          />
          <button
            className="mt-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            type="button"
            onClick={() => {
              mutateAsync({
                recipient,
                amount: 1,
              })
            }}
          >
            Order a sandwich
          </button>
        </p>
        <div className="md:flex-1">
          <h2>Schedule:</h2>
          {orders.data
            ? createSchedule(orders.data.orders).map((item) => (
                <li key={item.time}>
                  {formatSeconds(item.time)} {item.task} {item.recipient ? `for ${item.recipient}` : ''}
                </li>
              ))
            : 'Loading tRPC query...'}
        </div>
      </main>
    </>
  )
}

export default Home
