import { type NextPage } from "next";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [recipient, setRecipient] = useState<string>("");
  const orders = trpc.order.getAll.useQuery();

  const {mutateAsync} = trpc.order.create.useMutation({
    onSuccess: () => {
      orders.refetch();
    }
  });

  return (
    <>
      <label htmlFor="recipient">Recipient</label>
      <input
        id="recipient"
        type="text"
        onChange={(e) => setRecipient(e.currentTarget.value)}
      />
      <button onClick={() => {
          mutateAsync({
            recipient,
            amount: 1,
          })
      }}>Order a sandwich</button>
      <p>{orders.data ? JSON.stringify(orders.data.orders) : "Loading tRPC query..."}</p>
    </>
  );
};

export default Home;
