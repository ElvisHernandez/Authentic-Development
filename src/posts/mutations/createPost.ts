import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { PostSchema } from "../types";
import slugify from "slugify";

export default resolver.pipe(
  resolver.zod(PostSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (post) => {
    const createdPost = await db.post.create({
      data: {
        title: post.title,
        content: post.content,
        description: post.description,
        slug: slugify(post.title, { lower: true }),
        thumbnailUrl: post.thumbnailUrl,
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
