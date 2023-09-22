import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { resolver } from "@blitzjs/rpc";
import { s3Client } from "integrations/aws/s3Client";
import { getAwsBucketName } from "src/utils/getEnvVars";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { z } from "zod";

const GetThumbnailsSchema = z.object({
  thumbnailsPerPage: z.number(),
});

export default resolver.pipe(
  resolver.zod(GetThumbnailsSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (payload) => {
    let paginatedThumbnailUrls: Array<string[]> = [];

    try {
      const BUCKET_NAME = getAwsBucketName();

      const res = await s3Client.send(
        new ListObjectsCommand({
          Bucket: BUCKET_NAME,
          Prefix: "small",
        })
      );

      paginatedThumbnailUrls = (res.Contents || [])
        .map((obj) => `https://${BUCKET_NAME}.s3.amazonaws.com/${obj.Key}`)
        .reduce(
          (acc, thumbnailUrl) => {
            const lastPage = acc[acc.length - 1];
            if (lastPage?.length === payload.thumbnailsPerPage) {
              acc.push([thumbnailUrl]);
            } else {
              lastPage?.push(thumbnailUrl);
            }
            return acc;
          },
          [[]] as Array<string[]>
        );
    } catch (e) {
      console.error(e);
    }

    return {
      paginatedThumbnailUrls,
    };
  }
);
