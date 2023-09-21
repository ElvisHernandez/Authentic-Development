import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { PostSchema } from "../types";

export default resolver.pipe(
  resolver.authorize(),
  isAdminUserResolver,
  resolver.zod(PostSchema),
  async (post) => {
    const createdPost = await db.post.create({
      data: {
        title: post.title,
        content: post.content,
        description: "",
        tags: {
          connect: post.selectedTagIds.map((tagId) => ({ id: tagId })),
        },
      },
    });

    return {
      createdPost,
    };
  }
);
