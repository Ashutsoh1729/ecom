"use client";

import { signOut } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/util/states/modal";
import { useEffect, useState } from "react";

interface AvatarIconInterface {
  img?: string;
  role: "Buyer" | "Seller";
}

const AvatarIcon = ({ img, role = "Buyer" }: AvatarIconInterface) => {
  const router = useRouter();

  const { openModal } = useModalStore();
  const handleRoleButton = () => {
    if (role === "Buyer") {
      openModal("sellerCreating");
    }
    if (role === "Seller") {
      router.push("/");
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything on the server or during the initial client render
  if (!isMounted) {
    return null; // Or return a placeholder/skeleton
  }

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

          {role === "Seller" && (
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard
            </DropdownMenuItem>
          )}

          {role === "Buyer" && (
            <DropdownMenuItem
              onClick={() => {
                router.push("/orders");
              }}
            >
              Orders
            </DropdownMenuItem>
          )}

          {role === "Buyer" ? (
            <DropdownMenuItem onClick={handleRoleButton}>
              Be a Seller
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleRoleButton}>
              Switch to Buyer
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
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
