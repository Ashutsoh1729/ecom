"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ComponentType, ReactNode } from "react";
import { LucideProps } from "lucide-react";

export interface SectionHeaderInterface {
  name: string;
  hasCTA: boolean;
  ctaName?: string;
  hasIcon?: boolean;
  iconType?: "leading" | "trailing" | "icon only";
  iconAddr?: string;
  IconComponent?: ComponentType<LucideProps>;
  buttonVariant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  buttonAction?: () => void;
}

const SectionHeader = ({
  name,
  hasCTA,
  ctaName,
  hasIcon,
  iconType,
  iconAddr,
  IconComponent,
  buttonAction,
  buttonVariant = "outline",
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
              variant={buttonVariant}
              onClick={handleClick}
              className="px-5  hover:cursor-pointer flex"
            >
              {hasIcon &&
                iconType === "leading" &&
                (iconAddr ? (
                  <Image src={iconAddr} alt="leading icon" />
                ) : (
                  IconComponent && <IconComponent />
                ))}

              {iconType != "icon only" && ctaName}

              {hasIcon &&
                iconType === "trailing" &&
                (iconAddr ? (
                  <Image src={iconAddr} alt="trailing icon" />
                ) : (
                  IconComponent && <IconComponent />
                ))}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
