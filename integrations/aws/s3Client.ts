import { S3Client } from "@aws-sdk/client-s3";
import { getAwsAccessKeyId, getAwsSecretKey } from "src/utils/getEnvVars";

export const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: getAwsAccessKeyId(),
    secretAccessKey: getAwsSecretKey(),
  },
});
