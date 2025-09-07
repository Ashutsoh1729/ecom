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
import { handleBecomingSeller } from "@/util/logic";

interface AvatarIconInterface {
  img?: string;
}

const AvatarIcon = ({ img }: AvatarIconInterface) => {
  const router = useRouter();

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
          <DropdownMenuItem
            onClick={() => {
              handleBecomingSeller();
            }}
          >
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
