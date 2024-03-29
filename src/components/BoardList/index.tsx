"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { HelpCircle, User2 } from "lucide-react";

import { getBoards, getOrgLimit } from "@/api/http";

import useGet from "@/hooks/useGet";
import { Skeleton } from "../ui/skeleton";
import Hint from "../Hint";
import FormPopover from "../Form/Popover";
import { QUERY_KEY } from "@/constants/key";
import { EPath } from "@/constants/path";
import { MAX_FREE_BOARDS } from "@/constants/board";
import { IParams } from "@/types";
import { IBoardResponse } from "@/types/board";
import { IOrgLimitResponse } from "@/types/orgLimit";

const BoardList = ({ isValid, orgId }: { isValid: boolean; orgId: string }) => {
  const params = useParams<IParams>();

  // Call and handle api get boards
  const {
    data: boards,
    isLoading,
    isFetching,
  } = useGet<IBoardResponse[]>(
    [QUERY_KEY.BOARDS, params.id],
    () => getBoards(params.id),
    true,
    true
  );

  // Call and handle api get org limit
  const { data } = useGet<IOrgLimitResponse>(
    [QUERY_KEY.ORG_LIMIT, orgId],
    () => getOrgLimit(orgId as string),
    true,
    true
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-1/5 h-7" />
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="w-full h-full p-2 aspect-video" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 font-semibold text-lg text-neutral-700">
        <User2 className="w-6 h-6" />
        Your boards
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {boards &&
          boards.map((item) => (
            <Link
              key={item._id}
              href={`${EPath.BOARD}/${item._id}`}
              style={{
                background: `url(${item.image.thumbUrl}) center / cover no-repeat`,
              }}
              className="group w-full h-full relative aspect-video p-2 bg-sky-700 rounded-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
              <p className="relative font-semibold text-white">{item.title}</p>
            </Link>
          ))}

        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="w-full h-full relative flex-col justify-center items-center gap-1 p-3 aspect-video bg-muted flex rounded-sm hover:opacity-75 transition"
          >
            <p className="text-sm md:text-base text-center">
              Create a new board
            </p>
            <span className="text-xs md:text-sm">
              {isValid
                ? "Unlimited"
                : `${MAX_FREE_BOARDS - (data?.count as number)} remaining`}
            </span>
            <Hint
              description="Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspaces."
              sideOffset={40}
            >
              <HelpCircle className="w-4 h-4 absolute right-3 bottom-3" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;
