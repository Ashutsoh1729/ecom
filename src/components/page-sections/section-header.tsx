"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ReactNode } from "react";

export interface SectionHeaderInterface {
  name: string;
  hasCTA: boolean;
  ctaName?: string;
  hasIcon: boolean;
  iconType?: "leading" | "trailing" | "icon only";
  iconAddr?: string;
  iconComponent?: ReactNode;
  buttonAction?: () => void;
}

const SectionHeader = ({
  name,
  hasCTA,
  ctaName,
  hasIcon,
  iconType,
  iconAddr,
  iconComponent,
  buttonAction,
}: SectionHeaderInterface) => {
  function handleClick() {
    if (buttonAction) {
      buttonAction();
    }

    console.log("Edit action is clicked");
  }

  return (
    <div className="w-full flex justify-between items-center">
      <div className="font-[Alkatra] text-3xl">{name}</div>
      <div>
        {hasCTA && (
          <div id="action-container">
            <Button
              variant={"outline"}
              onClick={handleClick}
              className="px-5  hover:cursor-pointer flex"
            >
              {hasIcon &&
                (iconType === "leading" || iconType === "icon only") &&
                iconAddr && <Image src={iconAddr} alt="leading icon" />}

              {hasIcon &&
                (iconType === "leading" || iconType === "icon only") &&
                !iconAddr &&
                iconComponent}

              {iconType != "icon only" && ctaName}

              {hasIcon && iconType === "trailing" && !iconAddr && iconComponent}

              {hasIcon && iconType === "trailing" && iconAddr && (
                <Image src={iconAddr} alt="leading icon" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
