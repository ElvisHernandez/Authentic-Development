import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetPostsSchema = z.object({
  published: z.boolean().optional(),
});

export default resolver.pipe(resolver.zod(GetPostsSchema), async (args) => {
  return await db.post.findMany({
    include: { tags: true },
    where: {
      published: args.published ?? undefined,
    },
  });
});
