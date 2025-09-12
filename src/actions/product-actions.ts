"use server";

import {
  Out,
  variantsFormSchema,
} from "@/components/modals/create-product-modal";
import { db } from "@/db/client";
import { categories, products, productVariants, tags } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import slugify from "slugify";
import z from "zod";

// For creating a new product
// NOTE: Create product working perfectly fine.

const createProduct = async (data: Out) => {
  const productInsertSchema = createInsertSchema(products);
  const productVariantInsertSchema = createInsertSchema(productVariants);
  const partialVariantInsertSchema = z.array(
    productVariantInsertSchema.omit({
      productId: true,
    }),
  );
  const categoriesInsertSchema = z.array(createInsertSchema(categories));
  const tagsInsertSchema = z.array(createInsertSchema(tags));

  try {
    /*     const session = await auth();

    if (!session?.user) {
      throw new Error("User dosen't exits.");
    }
    if (!session.user.id) {
      throw new Error("User don't have a id");
    }

    const sellerId = session.user.sellerId;

    // const categorySlugArray = data.categories?.map((item)=>{})

    if (!sellerId) {
      throw new Error("Seller Id not found while creating product. ");
    }
 */
    // -- Splitting the data with respect to their table --

    // product data creating dataset
    const finalProductData = {
      name: data.name,
      description: data.description,
      status: data.status,
      storeId: data.storeId,
    };

    const partialProductVariantData = data.variants.map((item) => {
      const baseSlug = slugify(`${item.name}-${item.size}-${item.color}`, {
        lower: true,
        strict: true,
      });
      const finalSlug = `${baseSlug}-${nanoid(6)}`;
      return { ...item, sku: finalSlug };
    });

    // creating and adding sku for the product vairants

    const finalCategoryData = data.categories?.map((item) => {
      const baseSlug = slugify(item.name, { lower: true, strict: true });
      const finalSlug = `${baseSlug}-${nanoid(6)}`;
      return { ...item, slug: finalSlug };
    });
    const finalTagsData = data.tags;

    // TODO: we will first check the data validity

    const finalParsedProductData =
      productInsertSchema.safeParse(finalProductData);

    const partialParsedProductVariantData =
      partialVariantInsertSchema.safeParse(partialProductVariantData);

    const finalParsedCategoryData =
      categoriesInsertSchema.safeParse(finalCategoryData);

    if (
      !finalParsedCategoryData.success ||
      !finalParsedProductData.success ||
      !partialParsedProductVariantData.success
    ) {
      console.log(
        `All possible errors: data error: ${finalParsedProductData.error},category error: ${finalParsedCategoryData.error},variant error: ${partialParsedProductVariantData.error} ${partialProductVariantData}`,
      );

      throw new Error("Final data validation failed at category");
    }

    // TODO: As tags has given optional, we will check first whether there are tags are not, if not, then we will not do db call

    let validatedTagsData: z.infer<typeof tagsInsertSchema> | undefined;

    // Check if there is raw tag data to process
    if (finalTagsData && finalTagsData.length > 0) {
      // 1. Parse the data and store the result in a new, block-scoped variable.
      const parsedTagsResult = tagsInsertSchema.safeParse(finalTagsData);

      // 2. Immediately check the success of THAT result.
      if (!parsedTagsResult.success) {
        // If it fails, log a specific error and throw.
        console.error(
          "Final data validation failed at tags",
          parsedTagsResult.error.flatten(), // .flatten() gives cleaner errors
        );
        throw new Error("Final data validation failed at tags");
      } else {
        // 3. If it succeeds, extract the clean .data into your final variable.
        validatedTagsData = parsedTagsResult.data;
      }
    }

    // TODO: We will try to do one db call and insert multiple data into their respective tables
    // -- end line

    // we will do a db transaction
    await db.transaction(async (tx) => {
      // inserting the product
      const [currentProduct] = await tx
        .insert(products)
        .values({ ...finalParsedProductData.data })
        .returning({ productId: products.id });

      if (!currentProduct) {
        tx.rollback();
        console.error("Product value don't get returned");
      }

      const x = productVariantInsertSchema.omit({ productId: true });
      type variantObject = z.infer<typeof x>;
      // creating the product variants
      const finalProductVariantData = partialParsedProductVariantData.data.map(
        (item: variantObject) => {
          return {
            ...item,
            productId: currentProduct.productId,
          };
        },
      );
      console.log(finalProductVariantData);

      const newVariantInsertSchema = z.array(productVariantInsertSchema);
      const finalParsedProductVariantData = newVariantInsertSchema.safeParse(
        finalProductVariantData,
      );
      if (!finalParsedProductVariantData.success) {
        console.error("Final parsed variant data is unsuccessful");
        console.error(
          `Error in variant creation: ${finalParsedProductVariantData.error}`,
        );

        tx.rollback();
        throw new Error("A error happened in transaction");
      }

      // Now inserting product variants
      if (finalParsedProductVariantData.success) {
        await tx
          .insert(productVariants)
          .values(finalParsedProductVariantData.data);
      }
      if (finalParsedCategoryData.success) {
        await tx.insert(categories).values(finalParsedCategoryData.data);
      }

      // Now first checking whether tag value exists and then inserting
      if (validatedTagsData) {
        if (validatedTagsData?.length > 0) {
          await tx.insert(tags).values(validatedTagsData);
        }
      }
    });
  } catch (err) {
    console.error("Some error happened while creating the product: ", err);
  }
};

// For updating the product

const updateProduct = async () => {};

// For Deleting a Product

const deleteProduct = async () => {};

export { createProduct, updateProduct, deleteProduct };
