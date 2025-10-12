import ProductSections from "./components/product-sections";

const ProductsPage = async () => {
  // TODO: As product don't have their indivusual slug, we have to create one, we can give a default function to generate slug value from their name, and then while using a certain variant we will combine the slug value and sku of the variant to do our actions

  return (
    <div className="w-full h-full">
      <ProductSections />
    </div>
  );
};

export default ProductsPage;
