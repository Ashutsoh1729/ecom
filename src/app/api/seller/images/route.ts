import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  // 2. Get the file from the FormData object using the key 'image'
  const file = data.get("image");

  // 3. A safety check to make sure a file was received
  if (!file) {
    return NextResponse.json({ success: false, error: "No image found" });
  }

  console.log(file);
  return new NextResponse("Ok, All fine.");
}
