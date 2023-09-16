import { SessionContext } from "@blitzjs/auth";
import isAdminUser from "./isAdminUser";
import { AuthenticationError } from "blitz";

async function isAdminUserResolver<T>(
  input: T,
  { session }: { session: SessionContext }
): Promise<T> {
  const isAdmin = await isAdminUser(session);
  if (!isAdmin) throw new AuthenticationError();

  return input;
}

export default isAdminUserResolver;
