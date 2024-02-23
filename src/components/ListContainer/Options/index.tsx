"use client";

import { ElementRef, useRef } from "react";
import { Copy, MoreHorizontal, Plus, Trash, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import axiosClient from "@/api/axiosClient";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EApiPath } from "@/constants/path";
import { QUERY_KEY } from "@/constants/key";
import { IResponse } from "@/types";
import { IListCopyRequest, IListResponse } from "@/types/list";

interface IProps {
  data: IListResponse;
  boardId: string;
  orgId: string;
}

const ListOptions = (props: IProps) => {
  const { data, boardId, orgId } = props;

  const queryClient = useQueryClient();

  const closeRef = useRef<ElementRef<"button">>(null);

  const { mutate: copyList } = useMutation({
    mutationFn: async (data: IListCopyRequest) => {
      const res = await axiosClient.post<IResponse>(
        `${EApiPath.COPY_LIST}`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "List copied!");
      closeRef.current?.click();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LISTS] });
    },
    onError: (error) => {
      toast.error(error.message || "Copy list failure!");
    },
  });

  const { mutate: deleteList } = useMutation({
    mutationFn: async () => {
      const res = await axiosClient.delete<IResponse>(
        `${EApiPath.LIST}/${data._id}/${boardId}/${orgId}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "List deleted!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LISTS] });
    },
    onError: (error) => {
      toast.error(error.message || "Delete list failure!");
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="w-auto h-auto p-2 text-black">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={12}
        className="px-0 py-3"
      >
        <div className="text-center font-medium text-neutral-600 pb-4">
          List actions
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="w-auto h-auto absolute top-2 right-2 p-2 text-neutral-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          className="w-full justify-between pl-5 pr-4 py-2 font-normal rounded-none"
        >
          Add card
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-between pl-5 pr-4 py-2 font-normal rounded-none"
          onClick={() =>
            copyList({
              listId: data._id,
              title: data.title,
              boardId,
              orgId,
              cards: data.cards,
            })
          }
        >
          Copy list
          <Copy className="w-4 h-4" />
        </Button>
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className="w-full justify-between pl-5 pr-4 text-red-600 hover:text-red-500 py-2 font-normal rounded-none"
          onClick={() => deleteList()}
        >
          Delete this list
          <Trash className="w-4 h-4" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
