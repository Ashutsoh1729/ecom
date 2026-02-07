// lib/s3.ts
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

/**
 * Uploads a file to S3.
 * @param file - The file to upload (from FormData).
 * @param folder - The folder within the bucket to upload to (e.g., 'products').
 * @returns The URL of the uploaded file.
 */
export async function uploadFileToS3(
  file: File,
  storeName: string,
  productName: string,
): Promise<string> {
  try {
    const fileBuffer = await file.arrayBuffer();

    const fileExtension = file.name.split(".").pop();
    const newFileName = `${nanoid()}.${fileExtension}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: `${storeName}/${productName}/${newFileName}`,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
      // ACL: "public-read" as ObjectCannedACL, // Make the file publicly accessible
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Construct the public URL
    const url = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    return url;
  } catch (err) {
    console.error(
      "An error happened while uploading the file to aws s3 bucket.",
      err,
    );
    throw new Error(
      "An error happened while uploading the file to aws s3 bucket.",
      { cause: err },
    );
  }
}

/**
 * Deletes a file from S3 using its URL.
 * @param fileUrl - The public URL of the file to delete.
 */

export async function deleteFileFromS3(fileUrl: string): Promise<void> {
  try {
    // Extract the key from the URL
    const key = new URL(fileUrl).pathname.substring(1);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
  } catch (err) {
    console.error("Error has happened while deleting the image: ", err);
    throw new Error("An error happened while deleting the image");
  }
}
