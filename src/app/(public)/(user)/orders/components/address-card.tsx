import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddressFormType } from "@/components/modals/address-modal";

interface AddressCardProps {
  address: AddressFormType & { id: string };
}

export function OrderAddressCard({ address }: AddressCardProps) {
  return (
    <div>
      <div className="text-lg font-semibold">{address.recipientName}</div>
      <div>
        <div>{address.lane1}</div>
        {address.lane2 && <div>{address.lane2}</div>}
        {address.landmark && <div>{address.landmark}</div>}
        <div>
          <span>{address.city}, </span>
          <span>{address.state}, </span>
          <span>{address.country}</span>
        </div>
        <div>{address.postalCode}</div>
        <div>{address.phoneNumber}</div>
      </div>
    </div>
  );
}
