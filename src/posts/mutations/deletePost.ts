import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { PostWithIdSchema } from "../types";

export default resolver.pipe(
  resolver.authorize(),
  isAdminUserResolver,
  resolver.zod(PostWithIdSchema),
  async (post) => {
    const deletedPost = await db.post.delete({
      where: { id: post.id },
    });

    return {
      deletedPost,
    };
  }
);
