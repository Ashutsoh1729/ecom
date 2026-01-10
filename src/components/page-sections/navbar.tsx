"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AvatarIcon from "../../app/components/avatar-icon";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartItems } from "@/app/(public)/components/cart-context";
import { PublicSearchBar } from "./public_search_bar";

const Navbar = ({ userRole }: { userRole: "Buyer" | "Seller" }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const dbCartItems = useCartItems();

  //  FIX: The cart items don't get updated when the cart items are added, becoz the dbCartItems needed to be extracted once more time, we have to create an central data provider for the cart items

  const cartLength = dbCartItems.length;

  const handleSignIn = () => {
    router.push("/auth/sign-in");
  };

  return (
    <header className="h-fit w-full px-16 py-2 border-b-[1px] border-slate-400">
      <nav className="flex items-center justify-between ">
        <div id="logo" className="font-['Alkatra'] text-[32px]">
          <Link href={"/"}>
            <span>Amani</span>
          </Link>
        </div>
        <div className="flex items-center gap-8 lg:h-10">
          <div className="w-[400px]">
            <PublicSearchBar />
          </div>
          <div id="nav-icons" className="flex items-center h-full gap-4  ">
            <Heart
              size={28}
              strokeWidth={1.5}
              className="hover:cursor-pointer"
              onClick={() => {
                router.push("/wishlist");
              }}
            />

            <div className="relative flex items-center hover:cursor-pointer">
              <ShoppingBag
                size={28}
                strokeWidth={1.5}
                onClick={() => {
                  router.push("/shopping-bag");
                }}
              />
              <span className="top-[-6px] right-[-10px] px-[6px] py-[2px] absolute bg-black flex items-center justify-center  rounded-full text-white text-[10px] font-medium">
                {cartLength}
              </span>
            </div>
          </div>

          <div id="nav-action" className="flex items-center ">
            {session?.user ? (
              <AvatarIcon
                img={session.user.image ? session.user.image : undefined}
                role={userRole}
              />
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={handleSignIn}
                  className="hover:cursor-pointer "
                >
                  Sign In{" "}
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
