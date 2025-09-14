// Here will be the functions that can be used to create default value

import { customAlphabet } from "nanoid";
import slugify from "slugify";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 8); // It will create custom random code of length 8 char by using the chars given in the string

export function generateProductSlug(name: string) {
  const baseSlug = slugify(name, {
    lower: true, // convert to lowercase
    strict: true, // remove special characters
    remove: /[*+~.()'"!:@]/g, // remove characters that slugify don't handle
  });
  const uniqueId = nanoid();
  return `${baseSlug}-${uniqueId}`;
}
