"use client";

import { useAllProducts } from "./context";
import { ProductCard_2 } from "./product-card";

const PublicProductPageSections = () => {
  const allProductsData = useAllProducts();

  if (!allProductsData) {
    return <div> Data is not available</div>;
  }

  // console.log(allProductsData);

  return (
    <div id="featured-product-section" className="px-16">
      <div id="fp-container">
        {/* <div>It is working</div> */}
        <div className="mt-12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* {ProductCardList.map((item) => {
            return (
              <ProductCard_2
                key={item.productName}
                img={item.img}
                productName={item.productName}
                alt={item.productName}
                price={item.price}
              />
            );
          })} */}

          {allProductsData.map((item) => {
            const variant_prices = item.variants.map((item) => item.price);
            const lowest_price = Math.min(...variant_prices);
            return (
              <ProductCard_2
                key={item.name}
                img={item.mainImageUrl}
                productName={item.name}
                productId={item.id}
                alt={item.name}
                price={lowest_price}
                slug={item.slug}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PublicProductPageSections;
