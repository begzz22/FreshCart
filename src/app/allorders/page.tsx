import { Suspense } from "react";
import { getAllOrdersAction } from "@/PaymentAction/Order";
import OrdersList from "../_Components/OrdersData/OrdersList";

async function OrdersData() {
  const data = await getAllOrdersAction();

  return <OrdersList orders={data} />;
}

export default function AllOrders() {
  return (
    <Suspense fallback={<p>Loading Orders...</p>}>
      <OrdersData />
    </Suspense>
  );
}
