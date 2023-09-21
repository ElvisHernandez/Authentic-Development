import { resolver } from "@blitzjs/rpc";
import db from "db";

export default resolver.pipe(async () => {
  return await db.post.findMany({ include: { tags: true } });
});
