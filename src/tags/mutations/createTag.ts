import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";
import { z } from "zod";

const CreateTagSchema = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateTagSchema),
  resolver.authorize(),
  isAdminUserResolver,
  async (input) => {
    const tag = await db.tag.create({
      data: {
        name: input.name,
      },
    });

    return {
      success: true,
    };
  }
);
