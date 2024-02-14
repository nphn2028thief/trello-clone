"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useRef } from "react";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EPath } from "@/constants/path";
import { IOrganization } from "@/types/organization";
import { IRoute } from "@/types/route";
import { cn } from "@/lib/utils";

interface IProps {
  isActive: boolean;
  isExpanded: boolean;
  organization: IOrganization;
  onExpand: (id: string) => void;
}

const SidebarItem = (props: IProps) => {
  const { isActive, isExpanded, organization, onExpand } = props;

  const router = useRouter();
  const pathname = usePathname();

  const routes = useRef<IRoute[]>([
    {
      id: 1,
      label: "Boards",
      icon: <Layout className="w-4 h-4 mr-2" />,
      href: `${EPath.ORGANIZATION}/${organization.id}`,
    },
    {
      id: 2,
      label: "Activity",
      icon: <Activity className="w-4 h-4 mr-2" />,
      href: `${EPath.ORGANIZATION}/${organization.id}/activity`,
    },
    {
      id: 3,
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
      href: `${EPath.ORGANIZATION}/${organization.id}/settings`,
    },
    {
      id: 4,
      label: "Billing",
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      href: `${EPath.ORGANIZATION}/${organization.id}/billing`,
    },
  ]);

  return (
    <AccordionItem
      key={organization.id}
      value={organization.id}
      className="border-none"
    >
      <AccordionTrigger
        className={cn(
          "[&>svg]:mr-1.5 flex items-center gap-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
        onClick={() => onExpand(organization.id)}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 relative">
            <Image
              src={organization.imageUrl}
              alt="Organization"
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="flex flex-col text-neutral-700">
        {routes.current.map((item) => (
          <Button
            key={item.id}
            size="sm"
            variant="ghost"
            className={cn(
              "justify-start pl-11 mb-1 hover:bg-neutral-500/5",
              pathname === item.href && "bg-sky-500/10 text-sky-700"
            )}
            onClick={() => router.push(item.href)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default SidebarItem;
