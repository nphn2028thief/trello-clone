import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";

import OrganizationControl from "@/components/OrganizationControl";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "Organization"),
  };
}

const OrganizationDetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
};

export default OrganizationDetailLayout;
