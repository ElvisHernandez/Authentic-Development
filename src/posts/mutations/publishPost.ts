import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { z } from "zod";

const PublishPostSchema = z.object({
  id: z.number(),
  published: z.boolean(),
});

export default resolver.pipe(
  resolver.zod(PublishPostSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (post) => {
    const updatedPost = await db.post.update({
      where: { id: post.id },
      data: {
        published: post.published,
      },
    });

    return {
      updatedPost,
    };
  }
);
