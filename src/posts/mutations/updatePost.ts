import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { PostWithIdSchema } from "../types";

export default resolver.pipe(
  resolver.zod(PostWithIdSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (post) => {
    const updatedPost = await db.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        content: post.content,
        description: post.description,
        thumbnailUrl: post.thumbnailUrl,
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
