"use client";

import { Button } from "../ui/button";

const SectionHeader = ({
  name,
  hasCTA,
  ctaName,
}: {
  name: string;
  hasCTA: boolean;
  ctaName?: string;
}) => {
  function handleClick() {
    console.log("Edit action is clicked");
  }

  return (
    <div className="w-full flex justify-between items-center">
      <div className="font-[Alkatra] text-3xl">{name}</div>
      <div>
        {hasCTA && (
          <Button
            variant={"outline"}
            onClick={handleClick}
            className="px-5  hover:cursor-pointer"
          >
            {ctaName}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
