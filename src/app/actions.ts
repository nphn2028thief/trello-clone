"use server";

import { auth, currentUser } from "@clerk/nextjs";

export const getUser = async () => {
  const { orgId } = auth();
  const user = await currentUser();

  if (!user) {
    return;
  }

  const { id, emailAddresses } = user;

  return {
    orgId: orgId as string,
    userId: id,
    userEmail: emailAddresses[0].emailAddress,
  };
};
