import { getStoreList } from "@/lib/logic";
import StoreSections from "./components/sections";

const StorePage = async () => {
  const storesList = await getStoreList();

  return (
    <div>
      {" "}
      Store Page is active and running
      <StoreSections storesList={storesList} />
    </div>
  );
};

export default StorePage;
