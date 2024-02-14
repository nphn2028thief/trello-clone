"use client";

import { useParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { useOrganizationList } from "@clerk/nextjs";

const OrganizationControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useLayoutEffect(() => {
    if (!setActive) return;

    setActive({
      organization: params.id as string, // id is organization id
    });
  }, [params.id, setActive]);

  return null;
};

export default OrganizationControl;
