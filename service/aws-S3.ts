import fs from "fs";
import util from "util";

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

const readFile = util.promisify(fs.readFile);

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
  region: process.env.S3_REGION || "",
});

/* --------------------------------------------------------------------------------------------------------------------- */

/**
 * Uploads images to the specified bucket
 * @param bucketName - Name of the bucket
 * @param data - Image data to be uploaded
 * @param destination - Destination path in the bucket
 * @returns URL of the uploaded image
 */
export async function uploadImageData(
  data: string | Buffer,
  destination: string
) {
  const bucketName: string = process.env.S3_BUCKET_NAME || "";

  const url = `https://${bucketName}.s3.${process.env.S3_REGION}.amazonaws.com/${destination}`;

  try {
    data = typeof data === "string" ? await readFile(data) : data;

    const contentType = destination.endsWith(".png")
      ? "image/png"
      : destination.endsWith(".jpg")
      ? "image/jpg"
      : "image/jpeg";

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: destination,
        Body: data,
        ContentType: contentType,
      },
    });

    upload.on("httpUploadProgress", (progress) => {
      console.log(
        `Bucket : ${progress?.Bucket} -- Key : ${progress?.Key}\nLoaded : ${progress?.loaded} -- Total : ${progress?.total} -- Part : ${progress?.part}`
      );
    });

    await upload.done();

    return url;
  } catch (err: any) {
    console.log("Error in uploading Image to aws s3, retry in 30 sec : ", err);

    await new Promise((resolve) => {
      setTimeout(resolve, 30000);
    });

    return await uploadImageData(data, destination);
  }
}
