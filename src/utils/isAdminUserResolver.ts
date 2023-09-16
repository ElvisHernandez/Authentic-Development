import { SessionContext } from "@blitzjs/auth";
import isAdminUser from "./isAdminUser";
import { AuthenticationError } from "blitz";

export default async (input: any, { session }: { session: SessionContext }) => {
  const isAdmin = await isAdminUser(session);
  if (!isAdmin) throw new AuthenticationError();

  return input;
};
