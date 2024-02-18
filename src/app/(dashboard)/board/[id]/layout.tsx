import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";

import { EApiPath } from "@/constants/path";
import { baseURL } from "@/constants";
import { IParams } from "@/types";
import { IBoardResponse } from "@/types/board";

export async function generateMetadata({ params }: { params: IParams }) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await fetch(
    `${baseURL}${EApiPath.GET_BOARDS}/${orgId}/${params.id}`
  ).then((res) => res.json() as unknown as IBoardResponse);

  return {
    title: board.title || "Board",
  };
}

const BoardDetailLayout = ({ children }: { children: ReactNode }) => {
  return <main className="h-full">{children}</main>;
};

export default BoardDetailLayout;
