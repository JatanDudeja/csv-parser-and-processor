import { S3 } from "aws-sdk";

export async function uploadToS3(
  imageBuffer: Buffer,
): Promise<string | null> {
  try {
    const fileName = `compressed/${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.jpg`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: fileName,
      Body: imageBuffer,
      ContentType: "image/jpeg",
      ACL: "public-read",
    };

    // Upload to S3
    const uploadResult = await new S3().upload(params).promise();
    return uploadResult.Location;
  } catch (error: any) {
    console.error("Error uploading image to S3:", error.message);
    return null;
  }
}
