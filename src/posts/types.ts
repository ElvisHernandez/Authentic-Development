import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
  description: z.string(),
  selectedTagIds: z.array(z.number()),
  thumbnailUrl: z.string(),
});

export const PostWithIdSchema = PostSchema.extend({
  id: z.number(),
});
