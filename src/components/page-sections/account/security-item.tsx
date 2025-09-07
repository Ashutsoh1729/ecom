"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { MouseEvent, useState } from "react";

const SecurityItem = ({ name }: { name: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSecurity = (checked: boolean) => {
    const newState = checked;
    setIsChecked(newState);
    // console.log(`The current state is: ${newState} for name ${name}`);
  };

  return (
    <div className="w-full px-4 py-3 flex gap-3 bg-slate-200 items-center rounded-md">
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleSecurity}
        className="border-slate-800"
      />
      <span>{name}</span>
    </div>
  );
};

export default SecurityItem;
