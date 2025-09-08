"use client";

import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/util/states/modal";

interface AvatarIconInterface {
  img?: string;
}

const AvatarIcon = ({ img }: AvatarIconInterface) => {
  const router = useRouter();

  const { openModal } = useModalStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="w-10 h-10 hover:cursor-pointer">
            <AvatarImage src={img} alt={"image"} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              router.push("/account");
            }}
          >
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/orders");
            }}
          >
            Orders
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openModal("sellerCreating")}>
            Be a Seller
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut();
            }}
          >
            SignOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AvatarIcon;
