import { getAddress } from "@/actions/(public)/address";
import { AddressContextProvider } from "./components/address-context";
import OrderSections from "./components/sections";

const OrdersPage = async () => {
  const addresses = await getAddress();
  return (
    <AddressContextProvider value={addresses}>
      <div className="w-full h-full">
        <OrderSections />
      </div>
    </AddressContextProvider>
  );
};

export default OrdersPage;
