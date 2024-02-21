"use client";

import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@clerk/nextjs";

import LazyLoading from "@/components/LazyLoading";
import ListContainer from "@/components/ListContainer";
import { EPath } from "@/constants/path";
import { IParams } from "@/types";

interface IProps {
  params: IParams;
}

const BoardDetailPage = (props: IProps) => {
  const { params } = props;

  const router = useRouter();

  const { orgId } = useAuth();

  if (!orgId) {
    return router.push(EPath.SELECT_ORGANIZATION);
  }

  return (
    <Suspense fallback={<LazyLoading />}>
      <div className="h-full p-4 overflow-x-scroll">
        <ListContainer boardId={params.id} orgId={orgId} />
      </div>
    </Suspense>
  );
};

export default BoardDetailPage;
