"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { QUERY_KEY } from "@/constants/key";
import { EApiPath, EPath } from "@/constants/path";
import { IResponse } from "@/types";

const BoardNavbarOptions = ({ id }: { id: string }) => {
  const router = useRouter();

  const { orgId } = useAuth();

  const queryClient = useQueryClient();

  // Call and handle api delete board
  const { mutate: deleteBoard } = useMutation({
    mutationFn: async () => {
      const res = await axiosClient.delete<IResponse>(
        `${EApiPath.BOARD}/${id}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Board deleted!");
      router.push(`${EPath.ORGANIZATION}/${orgId}`);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.BOARDS] });
    },
    onError: (error) => {
      toast.error(error.message || "Delete board failure!");
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="w-auto h-auto p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={12}
        className="px-0 py-3"
      >
        <div className="text-center font-medium text-neutral-600 pb-4">
          Board actions
        </div>

        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="w-auto h-auto absolute top-2 right-2 p-2 text-neutral-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          className="w-full justify-between pl-5 pr-4 text-red-600 hover:text-red-500 py-2 font-normal rounded-none"
          onClick={() => deleteBoard()}
        >
          Delete this board
          <Trash className="w-4 h-4" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardNavbarOptions;
