import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { PostWithIdSchema } from "../types";

const DeletePostSchema = PostWithIdSchema.omit({ selectedTagIds: true });

export default resolver.pipe(
  resolver.zod(DeletePostSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (post) => {
    const deletedPost = await db.post.delete({
      where: { id: post.id },
    });

    return {
      deletedPost,
    };
  }
);
