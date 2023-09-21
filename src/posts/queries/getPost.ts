import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetPostSchema = z.object({
  id: z.number(),
});

export default resolver.pipe(resolver.zod(GetPostSchema), async (input) => {
  return await db.post.findUnique({ where: { id: input.id }, include: { tags: true } });
});
