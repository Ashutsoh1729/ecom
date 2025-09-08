import { Button } from "@/components/ui/button";

const OrdersPage = () => {
  return (
    <div>
      Orders Page
      <Button className="bg-white text-black">Working</Button>
      <form>
        <input type="text" />
        <Button className="bg-blue-600 text-white" variant={"ghost"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default OrdersPage;
