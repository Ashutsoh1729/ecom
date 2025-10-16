"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface OrderSuccessSectionsProps {
  orderId: string;
  totalAmount: number;
  expectedArrival: string;
}

const OrderSuccessSections: React.FC<OrderSuccessSectionsProps> = ({
  orderId,
  totalAmount,
  expectedArrival,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-green-500 mb-6"
      >
        <CheckCircle2 size={80} />
      </motion.div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Order Placed Successfully!
      </h1>
      <p className="text-gray-500 mb-10">
        Thank you for shopping with us. Your order has been confirmed.
      </p>

      {/* Order Summary */}
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="border-t border-gray-100">
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600">Order ID</span>
            <span className="font-medium text-gray-800">{orderId}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <span className="text-gray-600">Total Amount</span>
            <span className="font-medium text-gray-800">₹{totalAmount}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <span className="text-gray-600">Expected Delivery</span>
            <span className="font-medium text-gray-800">{expectedArrival}</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 mt-10">
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            router.push("/");
          }}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>
        <Button variant="outline">View My Orders</Button>
      </div>
    </div>
  );
};

export default OrderSuccessSections;
