import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { PostWithIdSchema } from "../types";

export default resolver.pipe(
  resolver.authorize(),
  isAdminUserResolver,
  resolver.zod(PostWithIdSchema),
  async (post) => {
    const updatedPost = await db.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        content: post.content,
        description: "",
        tags: {
          set: post.selectedTagIds.map((tagId) => ({ id: tagId })),
        },
      },
    });

    return {
      updatedPost,
    };
  }
);
