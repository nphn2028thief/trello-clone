import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";

import { getBoardByIdAndOrgId } from "@/api/httpServer";

import BoardNavbar from "@/components/Navbar/BoardNavbar";
import { EPath } from "@/constants/path";
import { ECode } from "@/constants/code";
import { IParams } from "@/types";
import { IBoardResponse } from "@/types/board";

interface IProps {
  children: ReactNode;
  params: IParams;
}

export async function generateMetadata({ params }: { params: IParams }) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await getBoardByIdAndOrgId(orgId, params.id);

  return {
    title: board.title || "Board",
  };
}

const BoardDetailLayout = async (props: IProps) => {
  const { children, params } = props;

  const { orgId } = auth();

  if (!orgId) {
    redirect(EPath.SELECT_ORGANIZATION);
  }

  // Call api get board by id and organization id in server side
  const board = await getBoardByIdAndOrgId(orgId, params.id);

  if (board.code in ECode) {
    notFound();
  }

  return (
    <div
      style={{
        background: `url(${
          (board as IBoardResponse).image?.fullUrl
        }) center / cover no-repeat`,
      }}
      className="h-full relative"
    >
      <BoardNavbar data={board} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15" />

      <main className="h-full pt-28">{children}</main>
    </div>
  );
};

export default BoardDetailLayout;
