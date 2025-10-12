import { useAllProducts } from "../../components/context";
import IndivisualProductPageSections from "../components/indivisual-product-sections";

const IndivisualProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return (
    <div>
      <IndivisualProductPageSections slug={slug} />
    </div>
  );
};

export default IndivisualProductPage;
