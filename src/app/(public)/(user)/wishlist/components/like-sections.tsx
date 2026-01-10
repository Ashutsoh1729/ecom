"use client";

import { ProductCard_2 } from "@/app/(public)/components/product-card";
import SectionHeader from "@/components/page-sections/section-header";
import { ChevronsLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface likeProducts {
  slug: string;
  img: string;
  name: string;
  price: number;
}

interface PublicLikeSectionsProps {
  products: likeProducts[] | [];
}

const PublicLikeSections = ({ products }: PublicLikeSectionsProps) => {
  const router = useRouter();
  // console.log(products);

  //  TODO: The like button don't stay activated, even the liked item is shown in the like page
  //  I needed to learn how to use tanstack query

  if (products.length === 0) {
    return (
      <div>
        <SectionHeader
          name="My Bag"
          hasCTA={true}
          ctaName="back to shopping"
          hasIcon={true}
          IconComponent={ChevronsLeft}
          iconType="leading"
          buttonAction={handleFirstHeaderAction}
        />
        <Link href={"/"}>
          <div className="w-full h-[60vh] bg-slate-100 flex justify-center items-center text-2xl font-medium text-slate-600 mt-6 rounded-md">
            {" "}
            Please Add items to your wishlist first
          </div>
        </Link>
      </div>
    );
  }

  function handleFirstHeaderAction(): void {
    router.push("/");
  }

  return (
    <div>
      <SectionHeader
        name="My Bag"
        hasCTA={true}
        ctaName="back to shopping"
        hasIcon={true}
        IconComponent={ChevronsLeft}
        iconType="leading"
        buttonAction={handleFirstHeaderAction}
      />
      <div className="mt-12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => {
          return (
            <ProductCard_2
              img={product.img}
              key={index}
              productName={product.name}
              productId=""
              alt={product.name}
              price={product.price}
              slug={product.slug}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PublicLikeSections;
