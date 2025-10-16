import OrderSuccessSections from "../../components/order-success-sections";

const OrderSuccessPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ order_id: string }>;
  searchParams: Promise<{ amount: number }>;
}) => {
  const id = (await params).order_id;
  const amount = (await searchParams).amount;
  return (
    <div>
      <OrderSuccessSections
        orderId={id}
        totalAmount={amount}
        expectedArrival={`12-10-2025`}
      />
    </div>
  );
};

export default OrderSuccessPage;
