import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
  selectedTagIds: z.array(z.number()),
});

export const PostWithIdSchema = PostSchema.extend({
  id: z.number(),
});
