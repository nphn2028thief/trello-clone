import { useParams } from "next/navigation";
import Link from "next/link";
import { HelpCircle, User2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import axiosClient from "@/api/axiosClient";

import { Skeleton } from "../ui/skeleton";
import Hint from "../Hint";
import FormPopover from "../Form/Popover";
import { QUERY_KEY } from "@/constants/key";
import { EApiPath, EPath } from "@/constants/path";
import { IParams } from "@/types";
import { IBoardResponse } from "@/types/board";

const BoardList = () => {
  const params = useParams<IParams>();

  // Call and handle api get boards
  const {
    data: boards,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY.BOARD, params.id],
    queryFn: async () => {
      const res = await axiosClient.get<IBoardResponse[]>(
        `${EApiPath.GET_BOARDS}/${params.id}`
      );
      return res.data;
    },
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
                backgroundImage: `url(${item.image.thumbUrl})`,
              }}
              className="group w-full h-full relative aspect-video bg-center bg-cover bg-no-repeat p-2 bg-sky-700 rounded-sm overflow-hidden"
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
            <span className="text-xs md:text-sm">5 remaining</span>
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
