import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { z } from "zod";

const UpdateTagSchema = z.object({
  name: z.string(),
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(UpdateTagSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (input) => {
    await db.tag.update({
      where: { id: input.id },
      data: { name: input.name },
    });

    return { success: true };
  }
);
