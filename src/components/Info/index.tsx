"use client";

import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";

import { Skeleton } from "../ui/skeleton";

const Info = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 relative">
          <Skeleton className="w-full h-full rounded-md absolute" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="w-24 h-7" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-[72px] h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 relative">
        <Image
          src={organization?.imageUrl!}
          alt="organization img"
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Free
        </div>
      </div>
    </div>
  );
};

export default Info;
