import ProductCard from "@/components/util/product-card";
import { ProductCardList } from "@/util/data";

export default function Home() {
  return (
    <>
      <div id="featured-product-section" className="px-16">
        <div id="fp-container">
          {/* <div>It is working</div> */}
          <div className="mt-12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ProductCardList.map((item) => {
              return (
                <ProductCard
                  key={item.productName}
                  img={item.img}
                  productName={item.productName}
                  category={item.category}
                  alt={item.alt}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
