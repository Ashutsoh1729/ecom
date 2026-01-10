import { getWishlistItems } from "@/actions/(public)/wishlist";
import PublicLikeSections from "./components/like-sections";

const LikesPage = async () => {
  // wl -> wishlist
  const wlitems = await getWishlistItems();

  if (!wlitems || !("wishlistItems" in wlitems)) {
    // nothing in wishlist
    return (
      <div className="pt-24 px-16 h-full">
        <PublicLikeSections products={[]} />
      </div>
    );
  }

  const wlProducts = wlitems.wishlistItems.map((item) => {
    const price = item.products.variants.map((variant) => variant.price);
    const minPrice = Math.min(...price);
    return {
      name: item.products.name,
      productId: item.productId,
      slug: item.products.slug,
      img: item.products.mainImageUrl,
      price: minPrice,
    };
  });

  // console.log(wlProducts);

  return (
    <div className="pt-24 px-16 h-full">
      <PublicLikeSections products={wlProducts} />
    </div>
  );
};

export default LikesPage;
