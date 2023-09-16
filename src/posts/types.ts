import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const PostWithIdSchema = PostSchema.extend({
  id: z.number(),
});
