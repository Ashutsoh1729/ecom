enum AddressType {
  home = "HOME",
  work = "WORK",
  other = "OTHER",
}

export interface Address {
  type: AddressType;
  addressLane1: string;
  addressLane2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

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
