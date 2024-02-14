import { ReactNode } from "react";

import OrganizationControl from "@/components/OrganizationControl";

const OrganizationDetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
};

export default OrganizationDetailLayout;
