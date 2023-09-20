import { resolver } from "@blitzjs/rpc";
import db from "db";
import isAdminUserResolver from "src/utils/isAdminUserResolver";

export default resolver.pipe(resolver.authorize(), isAdminUserResolver, async () => {
  return await db.tag.findMany();
});
