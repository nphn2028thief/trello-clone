"use client";

import { notFound } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { getBoardByIdAndOrgId } from "@/api/http";

import useGet from "@/hooks/useGet";
import { QUERY_KEY } from "@/constants/key";
import { IParams } from "@/types";
import { IBoardResponse } from "@/types/board";

const BoardDetailPage = ({ params }: { params: IParams }) => {
  const { orgId } = useAuth();

  // Call and handle api get board by id and organization id
  const { data: board, isError } = useGet<IBoardResponse>(
    [QUERY_KEY.BOARD, orgId, params.id],
    () => getBoardByIdAndOrgId(orgId as string, params.id)
  );

  if (isError) {
    notFound();
  }

  return (
    <div
      style={{
        backgroundImage: `url(${board?.image.fullUrl})`,
      }}
      className="h-full relative bg-center bg-cover bg-no-repeat"
    >
      <div className="h-full pt-20">
        <div>BoardDetailPage</div>
      </div>
    </div>
  );
};

export default BoardDetailPage;
