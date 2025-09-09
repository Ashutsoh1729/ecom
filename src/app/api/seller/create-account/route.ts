import { createNewSellerAccount } from "@/actions/create-new-seller-account";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  try {
    createNewSellerAccount(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log("error happen while updating the user role", err.message);
    } else {
      console.log("Unexpected error happened while updating the user role");
    }
  }

  return NextResponse.json("Ok");
}
