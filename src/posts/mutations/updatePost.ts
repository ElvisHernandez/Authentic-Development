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
      data: { title: post.title, content: post.content, description: "" },
      where: { id: post.id },
    });

    return {
      updatedPost,
    };
  }
);
