// Here we will define the types of the form related to product modal

import z from "zod";

export const availableColors = [
  { name: "Classic Black", hex: "#000000" },
  { name: "Snow White", hex: "#FFFFFF" },
  { name: "Forest Green", hex: "#228B22" },
  { name: "Crimson Red", hex: "#DC143C" },
];

// Define constants for clarity
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const availableSizes = ["xs", "s", "m", "l", "xl", "xxl"];

export const availableColorsNames = availableColors.map((item) => item.hex);

// Zod schema for a single image file
export const ImageSchema = z
  .instanceof(File, { message: "Image is required." })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `Max image size is 5MB.`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
  });

export const variantsFormSchema = z.object({
  // name, color, size, price, quantity
  name: z
    .string()
    .min(3, "Minimum length should be 2.")
    .max(15, "Name cannot be greater than 15 characters"),
  color: z.enum(availableColorsNames),
  size: z.enum(availableSizes),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
});

// TODO: Will add a feature to show error while trying to give invalid number data by using differernt input and output types which will show error on ui if string is given and also parse the string inputs to number

// const variantFormForInput = variantsFormSchema.partial().extend()

export const categoriesFormSchema = z.object({
  name: z.string().min(3, "Min cat name 3").max(25, "Max cat name 10"),
  // slug: z.string().min(3, "Min cat name 3"),
});

export const tagsFormSchema = z.object({
  name: z.string().min(3, "Min cat name 3").max(25, "Max cat name 10"),
  description: z
    .string()
    .min(3, "Min cat name 3")
    .max(300, "Max desc 300 char"),
});

export const productModalFormSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum length should be 2.")
    .max(15, "Name cannot be greater than 15 characters"),
  description: z
    .string()
    .min(10, "Minimum description should be at least 10 characters.")
    .max(300, "Max char 300 for desc"),
  status: z.enum(["draft", "active", "archive"]),
  storeId: z.string(),
  variants: z.array(variantsFormSchema),
  categories: z.array(categoriesFormSchema).min(1),
  // categories: z.array(categoriesFormSchema).optional(),
  // tags: z.array(tagsFormSchema).min(1),
  tags: z.array(tagsFormSchema).optional(),
  image: ImageSchema,
});
