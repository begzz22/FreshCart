"use client";

import { AllOrder } from "@/types/orders.t";
import OrderCard from "./OrdersData";


interface Props {
  orders: AllOrder;
}

export default function OrdersList({ orders }: Props) {
  return (
    <div className="my-12 w-full md:w-[90%] mx-auto p-5">
      <h1 className="text-3xl font-bold mb-8">All Orders</h1>

      <div className="space-y-6">
        {orders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
