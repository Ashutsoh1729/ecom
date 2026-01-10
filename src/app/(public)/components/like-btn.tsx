"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  addWishlistItems,
  removeWishlistItem,
} from "@/actions/(public)/wishlist";

interface LikeButtonProps {
  productId: string;
  productName: string;
}

export function LikeButton({ productId, productName }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  // console.log(slug);

  const handleLikeToggle = async () => {
    setIsLiked(!isLiked);

    if (isLiked === false) {
      try {
        await addWishlistItems(productId);
      } catch (err) {
        console.error(
          "Some error has happened wile adding the product to wishlist",
          err,
        );
      }
    } else {
      try {
        await removeWishlistItem(productId);
      } catch (err) {
        console.error(
          "Some error has happened wile adding the product to wishlist",
          err,
        );
      }
    }

    // Here you can add logic to update the wishlist in your backend or context
    // console.log(slug);
    /* toast({
      title: isLiked ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${productName} has been ${isLiked ? "removed from" : "added to"} your wishlist.`,
    }); */
    toast(isLiked ? "Removed from Wishlist" : "Added to Wishlist", {
      description: `${productName} has been ${isLiked ? "removed from" : "added to"} your wishlist.`,
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "rounded-full",
        isLiked ? "bg-red-100 text-red-600" : "bg-white text-gray-600",
        "hover:bg-red-100 hover:cursor-pointer hover:text-red-700 transition-colors",
      )}
      onClick={handleLikeToggle}
      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
    </Button>
  );
}
