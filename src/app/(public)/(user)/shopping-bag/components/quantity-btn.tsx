"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface BagQuantityButtonInterface {
  value: number;
  onChange: (x: number) => void;
}

const BagQuantityButton = ({ value, onChange }: BagQuantityButtonInterface) => {
  function handleMinus() {
    if (value > 1) {
      onChange(value - 1);
    }
    return;
  }

  function handlePlus() {
    onChange(value + 1);
  }

  return (
    <div className="">
      <Button
        onClick={handleMinus}
        className=""
        variant={"outline"}
        disabled={value == 1}
      >
        <Minus />
      </Button>
      <span className="px-4 text-[18px]">{value}</span>
      <Button onClick={handlePlus} className="" variant={"outline"}>
        <Plus />
      </Button>
    </div>
  );
};

export default BagQuantityButton;
