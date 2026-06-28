"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AvatarIcon from "../../app/components/avatar-icon";
import { Heart, ShoppingBag, Menu, Search, X, User, LayoutDashboard, Package, LogOut, ArrowRightLeft } from "lucide-react";
import { useCartItems } from "@/app/(public)/components/cart-context";
import { PublicSearchBar } from "./public_search_bar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useModalStore } from "@/util/states/modal";
import { useState } from "react";

const Navbar = ({ userRole }: { userRole: "Buyer" | "Seller" }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const dbCartItems = useCartItems();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const cartLength = dbCartItems.length;

  const handleSignIn = () => {
    router.push("/auth/sign-in");
  };

  const NavIcons = () => (
    <>
      <Heart
        size={24}
        strokeWidth={1.5}
        className="hover:cursor-pointer"
        onClick={() => router.push("/wishlist")}
      />
      <div className="relative flex items-center hover:cursor-pointer">
        <ShoppingBag
          size={24}
          strokeWidth={1.5}
          onClick={() => router.push("/shopping-bag")}
        />
        <span className="top-[-6px] right-[-10px] px-[6px] py-[2px] absolute bg-black flex items-center justify-center rounded-full text-white text-[10px] font-medium">
          {cartLength}
        </span>
      </div>
    </>
  );

  const AuthSection = () =>
    session?.user ? (
      <AvatarIcon
        img={session.user.image ? session.user.image : undefined}
        role={userRole}
      />
    ) : (
      <Button onClick={handleSignIn} className="hover:cursor-pointer">
        Sign In
      </Button>
    );

  return (
    <header className="h-fit w-full px-4 sm:px-8 lg:px-16 py-2 border-b border-slate-400">
      <nav className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 lg:gap-0">
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-1 hover:cursor-pointer">
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 sm:w-80 flex flex-col [&>button:last-of-type]:hidden">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between pt-4 px-4">
                <Link href="/" className="font-['Alkatra'] text-[28px] sm:text-[32px]">
                  Amani
                </Link>
                <SheetClose className="rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden">
                  <X size={20} strokeWidth={1.5} />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </div>
              <div className="flex flex-col gap-6 px-4 flex-1">
                <div className="w-full">
                  <PublicSearchBar />
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => router.push("/wishlist")}
                    className="flex items-center gap-3 text-lg hover:cursor-pointer"
                  >
                    <Heart size={20} strokeWidth={1.5} />
                    Wishlist
                  </button>
                  <button
                    onClick={() => router.push("/shopping-bag")}
                    className="flex items-center gap-3 text-lg hover:cursor-pointer"
                  >
                    <ShoppingBag size={20} strokeWidth={1.5} />
                    Shopping Bag ({cartLength})
                  </button>
                </div>
              </div>
              <div className="px-4 pb-6 pt-4 border-t">
                {session?.user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
                        {session.user.image ? (
                          <img
                            src={session.user.image}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <User size={20} strokeWidth={1.5} />
                        )}
                      </div>
                      <span className="font-medium text-sm truncate">
                        {session.user.name || "User"}
                      </span>
                    </div>
                    <button
                      onClick={() => router.push("/account")}
                      className="flex items-center gap-3 text-sm hover:cursor-pointer"
                    >
                      <User size={20} strokeWidth={1.5} />
                      Account
                    </button>
                    {userRole === "Seller" && (
                      <button
                        onClick={() => router.push("/dashboard")}
                        className="flex items-center gap-3 text-sm hover:cursor-pointer"
                      >
                        <LayoutDashboard size={20} strokeWidth={1.5} />
                        Dashboard
                      </button>
                    )}
                    {userRole === "Buyer" && (
                      <button
                        onClick={() => router.push("/orders")}
                        className="flex items-center gap-3 text-sm hover:cursor-pointer"
                      >
                        <Package size={20} strokeWidth={1.5} />
                        Orders
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (userRole === "Buyer") {
                          useModalStore.getState().openModal("sellerCreating");
                        } else {
                          router.push("/");
                        }
                      }}
                      className="flex items-center gap-3 text-sm hover:cursor-pointer"
                    >
                      <ArrowRightLeft size={20} strokeWidth={1.5} />
                      {userRole === "Buyer" ? "Be a Seller" : "Switch to Buyer"}
                    </button>
                    <div className="border-t pt-3 mt-1" />
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 text-sm text-red-600 hover:cursor-pointer"
                    >
                      <LogOut size={20} strokeWidth={1.5} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Button
                    onClick={handleSignIn}
                    className="hover:cursor-pointer w-full"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <div id="logo" className="font-['Alkatra'] text-[28px] sm:text-[32px]">
            <Link href={"/"}>
              <span>Amani</span>
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="w-[400px]">
            <PublicSearchBar />
          </div>
          <div id="nav-icons" className="flex items-center h-full gap-4">
            <NavIcons />
          </div>
          <div id="nav-action" className="flex items-center">
            <AuthSection />
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-1 hover:cursor-pointer"
          >
            {mobileSearchOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Search size={24} strokeWidth={1.5} />
            )}
          </button>
          <div className="relative flex items-center hover:cursor-pointer">
            <ShoppingBag
              size={24}
              strokeWidth={1.5}
              onClick={() => router.push("/shopping-bag")}
            />
            <span className="top-[-6px] right-[-10px] px-[6px] py-[2px] absolute bg-black flex items-center justify-center rounded-full text-white text-[10px] font-medium">
              {cartLength}
            </span>
          </div>
        </div>
      </nav>
      {mobileSearchOpen && (
        <div className="lg:hidden mt-2 pb-2">
          <PublicSearchBar />
        </div>
      )}
    </header>
  );
};

export default Navbar;
