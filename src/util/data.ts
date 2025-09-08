import { ProductCardInterface } from "@/components/util/product-card";
import { Address, AddressType } from "./types/address";

export interface navLink {
  name: string;
  link: string;
}

export const linkList: navLink[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Categories",
    link: "/categories",
  },
  {
    name: "About Us",
    link: "/about",
  },
];

export const ProductCardList: ProductCardInterface[] = [
  {
    img: "https://placehold.co/600x400/5A67D8/FFFFFF.png?text=Laptop",
    alt: "A modern silver laptop with the screen open",
    productName: "NovaBook Pro 15",
    price: 1499.99,
    rating: 4.9,
    category: "Electronics",
  },
  {
    img: "https://placehold.co/600x400/38A169/FFFFFF.png?text=Headphones",
    alt: "Sleek black over-ear wireless headphones",
    productName: "AcousticBliss Wireless Headphones",
    price: 199.5,
    rating: 4.7,
    category: "Electronics",
  },
  {
    img: "https://placehold.co/600x400/DD6B20/FFFFFF?text.png=T-Shirt",
    alt: "A plain white cotton t-shirt on a hanger",
    productName: "Classic Cotton Crew T-Shirt",
    price: 24.99,
    rating: 4.5,
    category: "Apparel",
  },
  {
    img: "https://placehold.co/600x400/D53F8C/FFFFFF?text.png=Yoga+Mat",
    alt: "A rolled-up teal eco-friendly yoga mat",
    productName: "ZenFlow Eco-Friendly Yoga Mat",
    price: 39.95,
    rating: 4.8,
    category: "Sports & Outdoors",
  },
];

export const AccountProductList = [
  {
    productName: "Men's Classic Crew Neck T-Shirt (Blue, Size L)",
    deliveryCity: "Rourkela",
    deliveryStatus: "Delivered",
    deliveryTime: "On September 5, 2025",
    productPrice: 799,
    productImage: "/image/haryo-setyadi-acn5ERAeSb4-unsplash.jpg",
    recipientName: "Sameer Das",
  },
  {
    productName: "Women's Graphic Print Oversized T-Shirt (White, Size M)",
    deliveryCity: "Bhubaneswar",
    deliveryStatus: "Arriving",
    deliveryTime: "By September 8, 2025",
    productPrice: 949,
    productImage: "/image/joshua-diaz-XNi6Cc8QsgI-unsplash.jpg",
    recipientName: "Ananya Patnaik",
  },
  {
    productName: "Men's Polo T-Shirt Combo (Pack of 3)",
    deliveryCity: "Cuttack",
    deliveryStatus: "Shipped",
    deliveryTime: "By September 11, 2025",
    productPrice: 1599,
    productImage: "/image/tuananh-blue-eYmOYPPHAtQ-unsplash.jpg",
    recipientName: "Bikash Sahoo",
  },
];

export const AddressList: Address[] = [
  {
    type: AddressType.home,
    addressLane1: "221B Baker Street",
    addressLane2: "Marylebone",
    landmark: "Near Regent's Park",
    city: "London",
    state: "Greater London",
    postalCode: "NW1 6XE",
    country: "UK",
  },
  {
    type: AddressType.work,
    addressLane1: "1600 Amphitheatre Parkway",
    city: "Mountain View",
    state: "CA",
    postalCode: "94043",
    country: "USA",
  },
];

console.log(AddressList[0].type);
