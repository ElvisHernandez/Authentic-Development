import { resolver } from "@blitzjs/rpc";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { z } from "zod";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getAwsBucketName } from "../../utils/getEnvVars";
import sharp from "sharp";
import { ImageSize } from "../types";
import { s3Client } from "integrations/aws/s3Client";

const uploadToS3 = async (buffer: ArrayBuffer, key: string) => {
  return await s3Client.send(
    new PutObjectCommand({
      Bucket: getAwsBucketName(),
      Key: key,
      Body: Buffer.from(buffer),
      ACL: "public-read",
    })
  );
};

const UploadFileSchema = z.object({
  file: z.string(),
  fileName: z.string(),
});

export default resolver.pipe(
  resolver.zod(UploadFileSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (payload) => {
    const base64String = payload.file.split(",")[1];

    if (!base64String) throw new Error("file must be a base64 encoded data URL");

    const buffer = Buffer.from(base64String, "base64");

    const small = await sharp(buffer).resize({ width: 100, height: 100 }).toBuffer();
    const medium = await sharp(buffer).resize({ width: 500 }).toBuffer();
    const large = await sharp(buffer).resize({ width: 1000 }).toBuffer();

    const now = Date.now();

    await Promise.all([
      uploadToS3(small, `${ImageSize.small}-${now}-${payload.fileName}`),
      uploadToS3(medium, `${ImageSize.medium}-${now}-${payload.fileName}`),
      uploadToS3(large, `${ImageSize.large}-${now}-${payload.fileName}`),
    ]);

    return {
      success: true,
    };
  }
);
