import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { resolver } from "@blitzjs/rpc";
import { s3Client } from "integrations/aws/s3Client";
import { getAwsBucketName } from "src/utils/getEnvVars";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { z } from "zod";

const DeleteImagePostSchema = z.object({
  s3ObjectKeys: z.array(z.string()),
});

export default resolver.pipe(
  resolver.zod(DeleteImagePostSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (payload) => {
    await Promise.all(
      payload.s3ObjectKeys.map((s3ObjectKey) =>
        s3Client.send(
          new DeleteObjectCommand({
            Bucket: getAwsBucketName(),
            Key: s3ObjectKey,
          })
        )
      )
    );

    return { success: true };
  }
);
