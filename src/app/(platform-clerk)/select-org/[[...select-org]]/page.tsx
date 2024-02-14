import { EPath } from "@/constants/path";
import { OrganizationList } from "@clerk/nextjs";
import React from "react";

const SelectOrganizationPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl={EPath.ORGANIZATION_DETAIL}
      afterSelectOrganizationUrl={EPath.ORGANIZATION_DETAIL}
    />
  );
};

export default SelectOrganizationPage;
