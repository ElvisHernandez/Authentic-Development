import { SessionContext } from "@blitzjs/auth";
import db from "db";
import { getAdminEmail } from "./getEnvVars";

export default async (session: SessionContext) => {
  const { userId } = session;

  if (!userId) return false;

  const user = await db.user.findFirst({ where: { id: userId } });

  if (user?.email !== getAdminEmail()) return false;

  return true;
};
