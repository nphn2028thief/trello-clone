"use client";

import Link from "next/link";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

import { Accordion } from "../ui/accordion";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import SidebarItem from "./SidebarItem";
import { EPath } from "@/constants/path";
import { IOrganization } from "@/types/organization";

interface IProps {
  storageKey?: string;
}

const Sidebar = (props: IProps) => {
  const { storageKey = "t-sidebar-state" } = props;

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrganization } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrganizationList } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  // Get all key of object and push it to accumulator array
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], curr) => {
      if (expanded[curr]) {
        acc.push(curr);
      }

      return acc;
    },
    []
  );

  const handleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !expanded[id],
    }));
  };

  if (
    !isLoadedOrganization ||
    !isLoadedOrganizationList ||
    userMemberships.isLoading
  ) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mt-1">
          <Skeleton className="w-3/5 h-6" />
          <Skeleton className="w-8 h-6" />
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }, (_, index) => (
            <SidebarItem.Skeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center font-medium mb-2">
        <span className="ml-1">Workspaces</span>
        <Button type="button" size="icon" variant="ghost" className="ml-auto">
          <Link href={EPath.SELECT_ORGANIZATION}>
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-3"
      >
        {userMemberships.data.map(({ organization }) => (
          <SidebarItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as IOrganization}
            onExpand={handleExpand}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Sidebar;
