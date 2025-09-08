export enum AddressType {
  home = "HOME",
  default = "DEFAULT",
  work = "WORK",
}
export interface Address {
  type: AddressType | null;
  addressLane1: string;
  addressLane2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
