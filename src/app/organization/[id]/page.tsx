"use client";

import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import BoardList from "@/components/BoardList";
import Info from "@/components/Info";
import LazyLoading from "@/components/LazyLoading";

const OrganizationDetailPage = () => {
  return (
    <Suspense fallback={<LazyLoading />}>
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </Suspense>
  );
};

export default OrganizationDetailPage;
